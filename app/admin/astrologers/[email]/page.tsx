"use client"
import { useState, useEffect } from "react"
import { notFound } from "next/navigation"

const documentLabels = {
  aadharCard: "Aadhar Card",
  panCard: "PAN Card",
  selfie: "Selfie Photo",
  workProof: "Work Proof",
  declarationForm: "Declaration Form",
  addressProof: "Address Proof",
}

// Add proper field mapping
const statusFieldMapping = {
  aadharCard: "aadharStatus",
  panCard: "panStatus",
  selfie: "selfieStatus",
  workProof: "workProofStatus",
  declarationForm: "declarationStatus",
  addressProof: "addressStatus",
}

const remarksFieldMapping = {
  aadharCard: "aadharRemarks",
  panCard: "panRemarks",
  selfie: "selfieRemarks",
  workProof: "workProofRemarks",
  declarationForm: "declarationRemarks",
  addressProof: "addressRemarks",
}

type DocumentKey = "aadharCard" | "panCard" | "selfie" | "workProof" | "declarationForm" | "addressProof"
type DocumentStatus = "unverified" | "pending" | "accepted" | "rejected"

interface DocumentStatuses {
  [key: string]: DocumentStatus
}

interface RejectionReasons {
  [key: string]: string
}

interface ShowRejectionInput {
  [key: string]: boolean
}

interface Astrologer {
  name: string
  email: string
  phone: string
  expertise: string
  experience: number
  joined: string
  documentStatus: string
  description: string
  profilePicture: string
  documents: Record<DocumentKey, string>
  bankDetails: {
    accountNo: string
    bankName: string
    ifsc: string
  }
}

export default function AstrologerDetailPage({ params }: { params: { email: string } }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [currentDocIndex, setCurrentDocIndex] = useState(0)
  const [documentStatuses, setDocumentStatuses] = useState<DocumentStatuses>({})
  const [rejectionReasons, setRejectionReasons] = useState<RejectionReasons>({})
  const [showRejectionInput, setShowRejectionInput] = useState<ShowRejectionInput>({})
  const [astrologer, setAstrologer] = useState<Astrologer | null>(null)
  const [loading, setLoading] = useState(true)

  const decodedEmail = decodeURIComponent(params?.email || "")

  // Add after fetching verification in useEffect
  const [educations, setEducations] = useState<any[]>([])
  const [certifications, setCertifications] = useState<any[]>([])
  const [eduStatuses, setEduStatuses] = useState<{ [id: number]: DocumentStatus }>({})
  const [eduRemarks, setEduRemarks] = useState<{ [id: number]: string }>({})
  const [eduShowReject, setEduShowReject] = useState<{ [id: number]: boolean }>({})
  const [certStatuses, setCertStatuses] = useState<{ [id: number]: DocumentStatus }>({})
  const [certRemarks, setCertRemarks] = useState<{ [id: number]: string }>({})
  const [certShowReject, setCertShowReject] = useState<{ [id: number]: boolean }>({})
  const [autoProcessing, setAutoProcessing] = useState(false)

  // Add state for modal
  const [eduModal, setEduModal] = useState<{ open: boolean; file: string; label: string } | null>(null)
  const [certModal, setCertModal] = useState<{ open: boolean; file: string; label: string } | null>(null)

  // Add state for admin remarks
  const [adminRemarks, setAdminRemarks] = useState("")

  // Add state for success message
  const [profileActionMsg, setProfileActionMsg] = useState<string | null>(null)

  // Add state for auto-processing controls
  const [autoProcessingEnabled, setAutoProcessingEnabled] = useState(true)
  const [processingStatus, setProcessingStatus] = useState<string | null>(null)
  const [lastAutoAction, setLastAutoAction] = useState<string | null>(null)

  // Helper function to normalize status values
  const normalizeStatus = (status: string): DocumentStatus => {
    if (!status) return "unverified"
    const lowerStatus = status.toLowerCase()
    if (["accepted", "approved", "verified"].includes(lowerStatus)) return "accepted"
    if (lowerStatus === "rejected") return "rejected"
    if (lowerStatus === "pending") return "pending"
    return "unverified"
  }

  // Fetch astrologer and verification data from backend on mount
  useEffect(() => {
    async function fetchAstrologer() {
      setLoading(true)
      try {
        const res = await fetch(`/api/astrologer/verification-by-email?email=${encodeURIComponent(decodedEmail)}`, {
          credentials: "include",
        })
        if (!res.ok) {
          setAstrologer(null)
          setLoading(false)
          return
        }
        const { verification } = await res.json()

        // Compose astrologer object from backend data
        const astro: Astrologer = {
          name: verification.astrologer.firstName + " " + verification.astrologer.lastName,
          email: verification.astrologer.email,
          phone: verification.astrologer.phone,
          expertise: verification.astrologer.areasOfExpertise,
          experience: verification.astrologer.yearsOfExperience || 0,
          joined: verification.astrologer.createdAt
            ? new Date(verification.astrologer.createdAt).toLocaleDateString()
            : "",
          documentStatus: verification.status,
          description: verification.astrologer.description || "",
          profilePicture: verification.astrologer.profileImage || "/placeholder-user.jpg",
          documents: {
            aadharCard: verification.aadharCard || "",
            panCard: verification.panCard || "",
            selfie: verification.selfie || "",
            workProof: verification.workProof || "",
            declarationForm: verification.declarationForm || "",
            addressProof: verification.addressProof || "",
          },
          bankDetails: {
            accountNo: verification.astrologer.accountNumber || "",
            bankName: verification.astrologer.bankName || "",
            ifsc: verification.astrologer.ifscCode || "",
          },
        }

        setAstrologer(astro)

        // Set document statuses and rejection reasons from backend - FIXED
        const docStatuses: DocumentStatuses = {}
        const docReasons: RejectionReasons = {}
        ;(["aadharCard", "panCard", "selfie", "workProof", "declarationForm", "addressProof"] as DocumentKey[]).forEach(
          (key) => {
            const statusField = statusFieldMapping[key]
            const remarksField = remarksFieldMapping[key]

            const backendStatus = verification[statusField]
            const backendRemarks = verification[remarksField]

            docStatuses[key] = normalizeStatus(backendStatus)
            docReasons[key] = backendRemarks || ""
          },
        )

        setDocumentStatuses(docStatuses)
        setRejectionReasons(docReasons)

        setEducations(verification.educations || [])
        setCertifications(verification.certifications || [])

        const eduStat: { [id: number]: DocumentStatus } = {}
        const eduRem: { [id: number]: string } = {}
        ;(verification.educations || []).forEach((e: any) => {
          eduStat[e.id] = normalizeStatus(e.status)
          eduRem[e.id] = e.remarks || ""
        })
        setEduStatuses(eduStat)
        setEduRemarks(eduRem)

        const certStat: { [id: number]: DocumentStatus } = {}
        const certRem: { [id: number]: string } = {}
        ;(verification.certifications || []).forEach((c: any) => {
          certStat[c.id] = normalizeStatus(c.status)
          certRem[c.id] = c.remarks || ""
        })
        setCertStatuses(certStat)
        setCertRemarks(certRem)

        setAdminRemarks(verification.adminRemarks || "")
      } catch {
        setAstrologer(null)
      }
      setLoading(false)
    }

    fetchAstrologer()
  }, [decodedEmail])

  // Enhanced auto-processing logic
  useEffect(() => {
    // Only run if auto-processing is enabled and astrologer is loaded
    if (
      !autoProcessingEnabled ||
      !astrologer ||
      astrologer.documentStatus === "approved" ||
      astrologer.documentStatus === "rejected"
    )
      return

    // Check if we have any documents at all
    const hasDocuments = Object.values(astrologer.documents).some((doc) => doc && doc.trim() !== "")
    const hasEducations = educations.length > 0
    const hasCertifications = certifications.length > 0

    // If no documents exist, don't auto-approve/reject
    if (!hasDocuments && !hasEducations && !hasCertifications) {
      setProcessingStatus("No documents to process")
      return
    }

    // Check document statuses
    const documentEntries = Object.entries(astrologer.documents).filter(([_, url]) => url && url.trim() !== "")
    const docStatuses = documentEntries.map(([key, _]) => documentStatuses[key] || "unverified")

    // Check education/certification statuses
    const eduStatusList = educations.map((edu) => eduStatuses[edu.id] || "unverified")
    const certStatusList = certifications.map((cert) => certStatuses[cert.id] || "unverified")

    // Combine all statuses
    const allStatuses = [...docStatuses, ...eduStatusList, ...certStatusList]

    // Count statuses for better feedback
    const statusCounts = {
      accepted: allStatuses.filter((s) => s === "accepted").length,
      rejected: allStatuses.filter((s) => s === "rejected").length,
      pending: allStatuses.filter((s) => s === "pending").length,
      unverified: allStatuses.filter((s) => s === "unverified").length,
      total: allStatuses.length,
    }

    // Update processing status
    if (statusCounts.unverified > 0 || statusCounts.pending > 0) {
      setProcessingStatus(`Waiting for review: ${statusCounts.unverified} unverified, ${statusCounts.pending} pending`)
      return
    }

    const allAccepted = statusCounts.accepted === statusCounts.total && statusCounts.total > 0
    const anyRejected = statusCounts.rejected > 0

    // Auto-approve logic
    if (allAccepted) {
      setProcessingStatus("Auto-approving: All documents accepted")
      setAutoProcessing(true)

      fetch("/api/astrologer/verification-by-email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: decodedEmail,
          type: "profile",
          status: "approved",
          remarks: `Auto-approved: All ${statusCounts.total} documents verified successfully`,
        }),
      })
        .then(() => {
          refetchVerification()
          setLastAutoAction(
            `Auto-approved at ${new Date().toLocaleTimeString()} - All ${statusCounts.total} documents accepted`,
          )
          setProfileActionMsg("✅ Astrologer auto-approved as all documents are accepted.")
          setProcessingStatus("Auto-approval completed")
          setTimeout(() => {
            setProfileActionMsg(null)
            setProcessingStatus(null)
          }, 5000)
        })
        .catch((error) => {
          console.error("Error auto-approving astrologer:", error)
          setProcessingStatus("Auto-approval failed")
          setProfileActionMsg("❌ Auto-approval failed. Please try manual approval.")
          setTimeout(() => {
            setProfileActionMsg(null)
            setProcessingStatus(null)
          }, 5000)
        })
        .finally(() => {
          setAutoProcessing(false)
        })
    }
    // Auto-reject logic
    else if (anyRejected) {
      setProcessingStatus("Auto-rejecting: Some documents rejected")
      setAutoProcessing(true)

      fetch("/api/astrologer/verification-by-email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: decodedEmail,
          type: "profile",
          status: "rejected",
          remarks: `Auto-rejected: ${statusCounts.rejected} out of ${statusCounts.total} documents were rejected`,
        }),
      })
        .then(() => {
          refetchVerification()
          setLastAutoAction(
            `Auto-rejected at ${new Date().toLocaleTimeString()} - ${statusCounts.rejected}/${statusCounts.total} documents rejected`,
          )
          setProfileActionMsg("❌ Astrologer auto-rejected as one or more documents are rejected.")
          setProcessingStatus("Auto-rejection completed")
          setTimeout(() => {
            setProfileActionMsg(null)
            setProcessingStatus(null)
          }, 5000)
        })
        .catch((error) => {
          console.error("Error auto-rejecting astrologer:", error)
          setProcessingStatus("Auto-rejection failed")
          setProfileActionMsg("❌ Auto-rejection failed. Please try manual rejection.")
          setTimeout(() => {
            setProfileActionMsg(null)
            setProcessingStatus(null)
          }, 5000)
        })
        .finally(() => {
          setAutoProcessing(false)
        })
    } else {
      setProcessingStatus("Ready for review")
    }
  }, [
    autoProcessingEnabled,
    documentStatuses,
    eduStatuses,
    certStatuses,
    astrologer,
    decodedEmail,
    educations,
    certifications,
  ])

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (!astrologer) return notFound()

  const documentKeys = Object.keys(astrologer.documents) as DocumentKey[]
  const currentDocKey = documentKeys[currentDocIndex]
  const currentDocUrl = astrologer.documents[currentDocKey]

  const handleNextDoc = () => {
    setCurrentDocIndex((prev) => (prev + 1) % documentKeys.length)
  }

  const handlePrevDoc = () => {
    setCurrentDocIndex((prev) => (prev - 1 + documentKeys.length) % documentKeys.length)
  }

  // Remove all calls to checkAndUpdateProfileStatus from handlers
  const handleAccept = async (docKey: DocumentKey) => {
    try {
      setDocumentStatuses((prev) => ({ ...prev, [docKey]: "accepted" }))
      setShowRejectionInput((prev) => ({ ...prev, [docKey]: false }))
      setRejectionReasons((prev) => ({ ...prev, [docKey]: "" }))

      await fetch("/api/astrologer/verification-by-email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: decodedEmail,
          type: "document",
          key: docKey,
          status: "accepted",
          remarks: "",
        }),
      })

      await refetchVerification()
    } catch (error) {
      console.error("Error accepting document:", error)
    }
  }

  const handleReject = (docKey: DocumentKey) => {
    setShowRejectionInput((prev) => ({ ...prev, [docKey]: true }))
  }

  const handleRejectConfirm = async (docKey: DocumentKey) => {
    if (rejectionReasons[docKey]?.trim()) {
      try {
        setDocumentStatuses((prev) => ({ ...prev, [docKey]: "rejected" }))
        setShowRejectionInput((prev) => ({ ...prev, [docKey]: false }))

        await fetch("/api/astrologer/verification-by-email", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: decodedEmail,
            type: "document",
            key: docKey,
            status: "rejected",
            remarks: rejectionReasons[docKey],
          }),
        })

        await refetchVerification()
      } catch (error) {
        console.error("Error rejecting document:", error)
      }
    }
  }

  const handleRejectCancel = (docKey: DocumentKey) => {
    setShowRejectionInput((prev) => ({ ...prev, [docKey]: false }))
    setRejectionReasons((prev) => ({ ...prev, [docKey]: "" }))
  }

  // Add handlers for education/certification accept/reject
  const handleAcceptEducation = async (id: number) => {
    try {
      setEduStatuses((prev) => ({ ...prev, [id]: "accepted" }))
      setEduShowReject((prev) => ({ ...prev, [id]: false }))
      setEduRemarks((prev) => ({ ...prev, [id]: "" }))

      await fetch("/api/astrologer/verification-by-email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: decodedEmail,
          type: "education",
          key: id,
          status: "accepted",
          remarks: "",
        }),
      })

      await refetchVerification()
    } catch (error) {
      console.error("Error accepting education:", error)
    }
  }

  const handleRejectEducation = (id: number) => {
    setEduShowReject((prev) => ({ ...prev, [id]: true }))
  }

  const handleRejectConfirmEducation = async (id: number) => {
    if (eduRemarks[id]?.trim()) {
      try {
        setEduStatuses((prev) => ({ ...prev, [id]: "rejected" }))
        setEduShowReject((prev) => ({ ...prev, [id]: false }))

        await fetch("/api/astrologer/verification-by-email", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: decodedEmail,
            type: "education",
            key: id,
            status: "rejected",
            remarks: eduRemarks[id],
          }),
        })

        await refetchVerification()
      } catch (error) {
        console.error("Error rejecting education:", error)
      }
    }
  }

  const handleRejectCancelEducation = (id: number) => {
    setEduShowReject((prev) => ({ ...prev, [id]: false }))
    setEduRemarks((prev) => ({ ...prev, [id]: "" }))
  }

  const handleAcceptCertification = async (id: number) => {
    try {
      setCertStatuses((prev) => ({ ...prev, [id]: "accepted" }))
      setCertShowReject((prev) => ({ ...prev, [id]: false }))
      setCertRemarks((prev) => ({ ...prev, [id]: "" }))

      await fetch("/api/astrologer/verification-by-email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: decodedEmail,
          type: "certification",
          key: id,
          status: "accepted",
          remarks: "",
        }),
      })

      await refetchVerification()
    } catch (error) {
      console.error("Error accepting certification:", error)
    }
  }

  const handleRejectCertification = (id: number) => {
    setCertShowReject((prev) => ({ ...prev, [id]: true }))
  }

  const handleRejectConfirmCertification = async (id: number) => {
    if (certRemarks[id]?.trim()) {
      try {
        setCertStatuses((prev) => ({ ...prev, [id]: "rejected" }))
        setCertShowReject((prev) => ({ ...prev, [id]: false }))

        await fetch("/api/astrologer/verification-by-email", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: decodedEmail,
            type: "certification",
            key: id,
            status: "rejected",
            remarks: certRemarks[id],
          }),
        })

        await refetchVerification()
      } catch (error) {
        console.error("Error rejecting certification:", error)
      }
    }
  }

  const handleRejectCancelCertification = (id: number) => {
    setCertShowReject((prev) => ({ ...prev, [id]: false }))
    setCertRemarks((prev) => ({ ...prev, [id]: "" }))
  }

  const getFileType = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase() || ""
    return ["jpg", "jpeg", "png", "gif"].includes(extension) ? "image" : "pdf"
  }

  // Add function to refetch verification and update state - FIXED
  const refetchVerification = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/astrologer/verification-by-email?email=${encodeURIComponent(decodedEmail)}`, {
        credentials: "include",
      })
      if (!res.ok) return

      const { verification } = await res.json()

      const astro: Astrologer = {
        name: verification.astrologer.firstName + " " + verification.astrologer.lastName,
        email: verification.astrologer.email,
        phone: verification.astrologer.phone,
        expertise: verification.astrologer.areasOfExpertise,
        experience: verification.astrologer.yearsOfExperience || 0,
        joined: verification.astrologer.createdAt
          ? new Date(verification.astrologer.createdAt).toLocaleDateString()
          : "",
        documentStatus: verification.status,
        description: verification.astrologer.description || "",
        profilePicture: verification.astrologer.profileImage || "/placeholder-user.jpg",
        documents: {
          aadharCard: verification.aadharCard || "",
          panCard: verification.panCard || "",
          selfie: verification.selfie || "",
          workProof: verification.workProof || "",
          declarationForm: verification.declarationForm || "",
          addressProof: verification.addressProof || "",
        },
        bankDetails: {
          accountNo: verification.astrologer.accountNumber || "",
          bankName: verification.astrologer.bankName || "",
          ifsc: verification.astrologer.ifscCode || "",
        },
      }

      setAstrologer(astro)

      // Update document statuses after refetch - FIXED
      const docStatuses: DocumentStatuses = {}
      const docReasons: RejectionReasons = {}
      ;(["aadharCard", "panCard", "selfie", "workProof", "declarationForm", "addressProof"] as DocumentKey[]).forEach(
        (key) => {
          const statusField = statusFieldMapping[key]
          const remarksField = remarksFieldMapping[key]

          const backendStatus = verification[statusField]
          const backendRemarks = verification[remarksField]

          docStatuses[key] = normalizeStatus(backendStatus)
          docReasons[key] = backendRemarks || ""
        },
      )

      setDocumentStatuses(docStatuses)
      setRejectionReasons(docReasons)

      setAdminRemarks(verification.adminRemarks || "")
    } finally {
      setLoading(false)
    }
  }

  const getDocumentStatusSummary = () => {
    const documentEntries = Object.entries(astrologer.documents).filter(([_, url]) => url && url.trim() !== "")
    const docStatuses = documentEntries.map(([key, _]) => documentStatuses[key] || "unverified")

    const eduStatusList = educations.map((edu) => eduStatuses[edu.id] || "unverified")
    const certStatusList = certifications.map((cert) => certStatuses[cert.id] || "unverified")

    const allStatuses = [...docStatuses, ...eduStatusList, ...certStatusList]

    const accepted = allStatuses.filter((s) => s === "accepted").length
    const rejected = allStatuses.filter((s) => s === "rejected").length
    const pending = allStatuses.filter((s) => s === "pending").length
    const unverified = allStatuses.filter((s) => s === "unverified").length

    return { accepted, rejected, pending, unverified, total: allStatuses.length }
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full p-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-6">
            {astrologer.profilePicture && (
              <img
                src={astrologer.profilePicture || "/placeholder.svg"}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 dark:border-gray-600"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{astrologer.name}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">{astrologer.expertise}</p>
              <div className="flex items-center mt-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  {astrologer.documentStatus}
                </span>
                <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                  {astrologer.experience} years experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.44a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact Info
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.joined}</p>
              </div>
            </div>
          </div>

          {/* Expertise Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Expertise & Experience
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Specialization</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.expertise}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.experience} years</p>
              </div>
            </div>
          </div>

          {/* Bank Details Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Bank Details
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Account Number</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.bankDetails.accountNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bank Name</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.bankDetails.bankName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">IFSC Code</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.bankDetails.ifsc}</p>
              </div>
            </div>
          </div>

          {/* Documents Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Documents
            </h2>
            <div className="space-y-3">
              <div>
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View Documents
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    astrologer.documentStatus === "approved"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : astrologer.documentStatus === "rejected"
                        ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                        : astrologer.documentStatus === "pending"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          : "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {astrologer.documentStatus}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {(() => {
                  const summary = getDocumentStatusSummary()
                  return `${summary.accepted} accepted, ${summary.rejected} rejected, ${summary.pending} pending, ${summary.unverified} unverified`
                })()}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Education Documents</h2>
            {educations.length === 0 && <p className="text-gray-500">No education documents submitted.</p>}
            {educations.map((edu) => (
              <div
                key={edu.id}
                className="mb-6 p-4 border rounded-xl bg-white dark:bg-gray-800 flex flex-col md:flex-row md:items-center md:space-x-6"
              >
                <div className="flex-1">
                  <div className="mb-2 font-semibold">
                    {edu.qualification} in {edu.fieldOfStudy}
                  </div>
                  <div className="mb-2 text-sm text-gray-500">{edu.universityName}</div>
                  <div className="mb-2 text-sm text-gray-500">
                    Degree File:{" "}
                    {edu.degreeFile ? (
                      <button
                        onClick={() =>
                          setEduModal({
                            open: true,
                            file: edu.degreeFile,
                            label: `${edu.qualification} - ${edu.universityName}`,
                          })
                        }
                        className="text-blue-600 underline"
                      >
                        View Document
                      </button>
                    ) : (
                      "Not uploaded"
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {/* Always show current status badge */}
                  {eduStatuses[edu.id] === "accepted" && (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">Accepted</span>
                  )}
                  {eduStatuses[edu.id] === "rejected" && (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-800">Rejected</span>
                  )}
                  {eduStatuses[edu.id] === "pending" && (
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                  )}
                  {eduStatuses[edu.id] === "unverified" && (
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800">Unverified</span>
                  )}

                  {/* Show rejection reason if rejected */}
                  {eduStatuses[edu.id] === "rejected" && eduRemarks[edu.id] && (
                    <div className="mt-2 text-sm text-red-700">Reason: {eduRemarks[edu.id]}</div>
                  )}

                  {/* Rejection input */}
                  {eduShowReject[edu.id] && (
                    <div className="mt-2 space-y-2">
                      <input
                        type="text"
                        value={eduRemarks[edu.id] || ""}
                        onChange={(e) => setEduRemarks((prev) => ({ ...prev, [edu.id]: e.target.value }))}
                        placeholder="Rejection reason..."
                        className="px-2 py-1 border rounded"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRejectCancelEducation(edu.id)}
                          className="px-3 py-1 bg-gray-200 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleRejectConfirmEducation(edu.id)}
                          disabled={!eduRemarks[edu.id]?.trim()}
                          className="px-3 py-1 bg-red-600 text-white rounded disabled:bg-gray-400"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Always show Accept/Reject buttons, always enabled */}
                  {!eduShowReject[edu.id] && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleAcceptEducation(edu.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectEducation(edu.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Certification Documents</h2>
            {certifications.length === 0 && <p className="text-gray-500">No certification documents submitted.</p>}
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="mb-6 p-4 border rounded-xl bg-white dark:bg-gray-800 flex flex-col md:flex-row md:items-center md:space-x-6"
              >
                <div className="flex-1">
                  <div className="mb-2 font-semibold">
                    {cert.courseName} ({cert.yearOfCompletion})
                  </div>
                  <div className="mb-2 text-sm text-gray-500">{cert.instituteName}</div>
                  <div className="mb-2 text-sm text-gray-500">
                    Certificate File:{" "}
                    {cert.certificateFile ? (
                      <button
                        onClick={() =>
                          setCertModal({
                            open: true,
                            file: cert.certificateFile,
                            label: `${cert.courseName} - ${cert.instituteName}`,
                          })
                        }
                        className="text-blue-600 underline"
                      >
                        View Document
                      </button>
                    ) : (
                      "Not uploaded"
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {/* Always show current status badge */}
                  {certStatuses[cert.id] === "accepted" && (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">Accepted</span>
                  )}
                  {certStatuses[cert.id] === "rejected" && (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-800">Rejected</span>
                  )}
                  {certStatuses[cert.id] === "pending" && (
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                  )}
                  {certStatuses[cert.id] === "unverified" && (
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800">Unverified</span>
                  )}

                  {/* Show rejection reason if rejected */}
                  {certStatuses[cert.id] === "rejected" && certRemarks[cert.id] && (
                    <div className="mt-2 text-sm text-red-700">Reason: {certRemarks[cert.id]}</div>
                  )}

                  {/* Rejection input */}
                  {certShowReject[cert.id] && (
                    <div className="mt-2 space-y-2">
                      <input
                        type="text"
                        value={certRemarks[cert.id] || ""}
                        onChange={(e) => setCertRemarks((prev) => ({ ...prev, [cert.id]: e.target.value }))}
                        placeholder="Rejection reason..."
                        className="px-2 py-1 border rounded"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRejectCancelCertification(cert.id)}
                          className="px-3 py-1 bg-gray-200 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleRejectConfirmCertification(cert.id)}
                          disabled={!certRemarks[cert.id]?.trim()}
                          className="px-3 py-1 bg-red-600 text-white rounded disabled:bg-gray-400"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Always show Accept/Reject buttons, always enabled */}
                  {!certShowReject[cert.id] && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleAcceptCertification(cert.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectCertification(cert.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Profile Verification Control */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19v-7" />
            </svg>
            Profile Verification Control
          </h2>

          {/* Auto-Processing Toggle */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Auto-Processing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically approve/reject based on document status
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoProcessingEnabled}
                  onChange={(e) => setAutoProcessingEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Processing Status */}
            {processingStatus && (
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center">
                  {autoProcessing && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  )}
                  <span className="text-sm text-blue-800 dark:text-blue-200">{processingStatus}</span>
                </div>
              </div>
            )}

            {/* Last Auto Action */}
            {lastAutoAction && (
              <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-green-600 dark:text-green-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-green-800 dark:text-green-200">Last action: {lastAutoAction}</span>
                </div>
              </div>
            )}
          </div>

          {/* Current Status */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Status</p>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  astrologer.documentStatus === "approved"
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : astrologer.documentStatus === "rejected"
                      ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      : astrologer.documentStatus === "pending"
                        ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        : "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                }`}
              >
                {astrologer.documentStatus}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Admin Remarks</p>
              <p className="font-medium text-gray-700 dark:text-gray-200">{adminRemarks || "—"}</p>
            </div>
          </div>

          {/* Enhanced Verification Summary */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Detailed Verification Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {Object.values(documentStatuses).filter((s) => s === "accepted").length +
                    Object.values(eduStatuses).filter((s) => s === "accepted").length +
                    Object.values(certStatuses).filter((s) => s === "accepted").length}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">Accepted</div>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <div className="text-2xl font-bold text-red-800 dark:text-red-200">
                  {Object.values(documentStatuses).filter((s) => s === "rejected").length +
                    Object.values(eduStatuses).filter((s) => s === "rejected").length +
                    Object.values(certStatuses).filter((s) => s === "rejected").length}
                </div>
                <div className="text-xs text-red-600 dark:text-red-400">Rejected</div>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                  {Object.values(documentStatuses).filter((s) => s === "pending").length +
                    Object.values(eduStatuses).filter((s) => s === "pending").length +
                    Object.values(certStatuses).filter((s) => s === "pending").length}
                </div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400">Pending</div>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-900/30 rounded-lg">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {Object.values(documentStatuses).filter((s) => s === "unverified").length +
                    Object.values(eduStatuses).filter((s) => s === "unverified").length +
                    Object.values(certStatuses).filter((s) => s === "unverified").length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Unverified</div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Total Documents:{" "}
                {Object.entries(astrologer.documents).filter(([_, url]) => url && url.trim() !== "").length +
                  educations.length +
                  certifications.length}
              </span>
            </div>
          </div>

          {/* Manual Override Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Manual Override</h4>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Override auto-processing with manual decision
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={astrologer.documentStatus === "approved" || autoProcessing}
                onClick={async () => {
                  setAutoProcessing(true)
                  setProcessingStatus("Manual approval in progress...")
                  try {
                    await fetch("/api/astrologer/verification-by-email", {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include",
                      body: JSON.stringify({
                        email: decodedEmail,
                        type: "profile",
                        status: "approved",
                        remarks: adminRemarks || "Manually approved by admin",
                      }),
                    })
                    await refetchVerification()
                    setLastAutoAction(`Manually approved at ${new Date().toLocaleTimeString()}`)
                    setProfileActionMsg("✅ Astrologer approved successfully.")
                    setProcessingStatus("Manual approval completed")
                    setTimeout(() => {
                      setProfileActionMsg(null)
                      setProcessingStatus(null)
                    }, 3000)
                  } catch (error) {
                    console.error("Error approving astrologer:", error)
                    setProcessingStatus("Manual approval failed")
                    setProfileActionMsg("❌ Manual approval failed.")
                    setTimeout(() => {
                      setProfileActionMsg(null)
                      setProcessingStatus(null)
                    }, 3000)
                  } finally {
                    setAutoProcessing(false)
                  }
                }}
              >
                {autoProcessing && astrologer.documentStatus !== "approved" ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : astrologer.documentStatus === "approved" ? (
                  "Already Approved"
                ) : (
                  "Manually Approve Astrologer"
                )}
              </button>

              <div>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-gray-100 mb-2"
                  placeholder="Enter reason for rejection..."
                  value={adminRemarks}
                  onChange={(e) => setAdminRemarks(e.target.value)}
                />
                <button
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={astrologer.documentStatus === "rejected" || autoProcessing}
                  onClick={async () => {
                    setAutoProcessing(true)
                    setProcessingStatus("Manual rejection in progress...")
                    try {
                      await fetch("/api/astrologer/verification-by-email", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({
                          email: decodedEmail,
                          type: "profile",
                          status: "rejected",
                          remarks: adminRemarks || "Rejected by admin",
                        }),
                      })
                      await refetchVerification()
                      setLastAutoAction(`Manually rejected at ${new Date().toLocaleTimeString()}`)
                      setProfileActionMsg("❌ Astrologer rejected.")
                      setProcessingStatus("Manual rejection completed")
                      setTimeout(() => {
                        setProfileActionMsg(null)
                        setProcessingStatus(null)
                      }, 3000)
                    } catch (error) {
                      console.error("Error rejecting astrologer:", error)
                      setProcessingStatus("Manual rejection failed")
                      setProfileActionMsg("❌ Manual rejection failed.")
                      setTimeout(() => {
                        setProfileActionMsg(null)
                        setProcessingStatus(null)
                      }, 3000)
                    } finally {
                      setAutoProcessing(false)
                    }
                  }}
                >
                  {autoProcessing && astrologer.documentStatus !== "rejected" ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : astrologer.documentStatus === "rejected" ? (
                    "Already Rejected"
                  ) : (
                    "Manually Reject Astrologer"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action Messages */}
          {profileActionMsg && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 dark:text-green-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-green-800 dark:text-green-200">{profileActionMsg}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Document Viewer Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-scroll">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{documentLabels[currentDocKey]}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentDocIndex + 1} of {documentKeys.length}
                </span>
              </div>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex h-[calc(95vh-200px)]">
              {/* Navigation */}
              <div className="flex flex-col justify-center p-4">
                <button
                  onClick={handlePrevDoc}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  disabled={documentKeys.length <= 1}
                >
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              {/* Document Display */}
              <div className="flex-1 p-6 flex items-center justify-center">
                <div className="w-full h-full bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                  {getFileType(currentDocUrl) === "image" ? (
                    <img
                      src={currentDocUrl || "/placeholder.svg"}
                      alt={documentLabels[currentDocKey]}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  ) : (
                    <iframe
                      src={currentDocUrl}
                      className="w-full h-full rounded-lg"
                      title={documentLabels[currentDocKey]}
                    />
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex flex-col justify-center p-4">
                <button
                  onClick={handleNextDoc}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  disabled={documentKeys.length <= 1}
                >
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-4">
                {/* Always show current status badge */}
                <div className="flex items-center justify-center">
                  {documentStatuses[currentDocKey] === "accepted" && (
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Accepted
                    </span>
                  )}
                  {documentStatuses[currentDocKey] === "rejected" && (
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      Rejected
                    </span>
                  )}
                  {documentStatuses[currentDocKey] === "pending" && (
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Pending
                    </span>
                  )}
                  {documentStatuses[currentDocKey] === "unverified" && (
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                      Unverified
                    </span>
                  )}
                </div>

                {/* Show rejection reason if rejected */}
                {documentStatuses[currentDocKey] === "rejected" && rejectionReasons[currentDocKey] && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      <strong>Rejection Reason:</strong> {rejectionReasons[currentDocKey]}
                    </p>
                  </div>
                )}

                {/* Rejection Reason Input */}
                {showRejectionInput[currentDocKey] && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={rejectionReasons[currentDocKey] || ""}
                      onChange={(e) => setRejectionReasons((prev) => ({ ...prev, [currentDocKey]: e.target.value }))}
                      placeholder="Please enter the reason for rejection..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    />
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleRejectCancel(currentDocKey)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleRejectConfirm(currentDocKey)}
                        disabled={!rejectionReasons[currentDocKey]?.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        Confirm Rejection
                      </button>
                    </div>
                  </div>
                )}

                {/* Always show Accept/Reject buttons, always enabled */}
                {!showRejectionInput[currentDocKey] && (
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleAccept(currentDocKey)}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Accept Document
                    </button>
                    <button
                      onClick={() => handleReject(currentDocKey)}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Reject Document
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {eduModal && eduModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{eduModal.label}</h3>
              <button
                onClick={() => setEduModal(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center p-6">
              {getFileType(eduModal.file) === "image" ? (
                <img
                  src={eduModal.file || "/placeholder.svg"}
                  alt={eduModal.label}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <iframe src={eduModal.file} className="w-full h-[70vh] rounded-lg" title={eduModal.label} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {certModal && certModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{certModal.label}</h3>
              <button
                onClick={() => setCertModal(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center p-6">
              {getFileType(certModal.file) === "image" ? (
                <img
                  src={certModal.file || "/placeholder.svg"}
                  alt={certModal.label}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <iframe src={certModal.file} className="w-full h-[70vh] rounded-lg" title={certModal.label} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
