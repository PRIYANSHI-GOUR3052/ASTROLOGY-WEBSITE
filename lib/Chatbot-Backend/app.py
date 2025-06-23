from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
import time
from typing import List
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import TextLoader
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize environment variables and models
os.environ['GROQ_API_KEY'] = os.getenv("GROQ_API_KEY")
groq_api_key = os.getenv("GROQ_API_KEY")

# Initialize embeddings and LLM
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
llm = ChatGroq(groq_api_key=groq_api_key, model_name="Llama3-8b-8192")

# Predefined questions with translations
PREDEFINED_QUESTIONS = [
    {
        "en": "What services does Nakshatra Gyaan offer?",
        "hi": "नक्षत्र ज्ञान क्या सेवाएं प्रदान करता है?"
    },
    {
        "en": "How can I get my daily horoscope?",
        "hi": "मैं अपनी दैनिक राशिफल कैसे प्राप्त कर सकता हूं?"
    },
    {
        "en": "Who is Dr. Narendra Kumar Sharma?",
        "hi": "डॉ नरेंद्र कुमार शर्मा कौन हैं?"
    },
    {
        "en": "How do I book a consultation with Dr. Sharma?",
        "hi": "डॉ शर्मा के साथ परामर्श कैसे बुक करें?"
    },
    {
        "en": "What products can I buy from Nakshatra Gyaan?",
        "hi": "नक्षत्र ज्ञान से मैं कौन से उत्पाद खरीद सकता हूं?"
    },
    {
        "en": "Can I get a personalized astrology report?",
        "hi": "क्या मैं एक व्यक्तिगत ज्योतिष रिपोर्ट प्राप्त कर सकता हूं?"
    }
]

# Greeting messages
GREETINGS = {
    "en": "Welcome to Nakshatra Gyaan! I'm your personal astrology assistant. How can I help you today?",
    "hi": "नक्षत्र ज्ञान में आपका स्वागत है! मैं आपका व्यक्तिगत ज्योतिष सहायक हूं। मैं आज आपकी कैसे मदद कर सकता हूं?"
}

# Create prompt template
prompt = ChatPromptTemplate.from_template(
    """
    You are Nakshatra Gyaan, a concise and friendly AI assistant specializing in Hindu astrology.
    Your responses must be brief and clear, limited to 4-5 lines maximum.

    Important Rules:
    1. Keep ALL responses under 5 lines - no exceptions
    2. Focus on the most important information only
    3. Use simple, direct language
    4. If more detail is needed, suggest booking a consultation
    
    Language Guidelines:
    - If the user's message is in Hindi, respond in Hindi (still keeping it to 4-5 lines)
    - If the user's message is in English, respond in English
    
    <context>
    {context}
    </context>
    
    Question: {input}
    
    Provide a brief 4-5 line response:
    """
)

# Request and Response models
class ChatRequest(BaseModel):
    message: str
    language: str = "en"  # Default to English if not specified

class ChatResponse(BaseModel):
    response: str
    processing_time: float

class PredefinedQuestionsResponse(BaseModel):
    questions: List[dict]
    greeting: str

def create_vector_embedding():
    try:
        loader = TextLoader("nakshta-gyaan.txt")
        documents = loader.load()
        
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        texts = text_splitter.split_documents(documents)
        
        vectorstore = FAISS.from_documents(texts, embeddings)
        return vectorstore
    except Exception as e:
        print(f"Error creating vector store: {str(e)}")
        return None

# Initialize vector store at startup
vectorstore = create_vector_embedding()
if not vectorstore:
    raise Exception("Failed to initialize vector store")

# Create chains
document_chain = create_stuff_documents_chain(llm, prompt)
retriever = vectorstore.as_retriever()
retrieval_chain = create_retrieval_chain(retriever, document_chain)

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        start_time = time.time()
        
        # Process the message and get response
        response = retrieval_chain.invoke({
            "input": request.message
        })
        
        processing_time = time.time() - start_time
        
        return ChatResponse(
            response=response["answer"],
            processing_time=processing_time
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )

@app.get("/api/predefined-questions")
async def get_predefined_questions(language: str = "en"):
    """
    Return predefined questions and greeting in the specified language
    """
    return PredefinedQuestionsResponse(
        questions=PREDEFINED_QUESTIONS,
        greeting=GREETINGS[language]
    )

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5100)