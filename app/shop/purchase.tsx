import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PurchasePage = () => {
  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState(null)

  useEffect(() => {
    // Fetch product details based on the slug
    if (slug) {
      // Simulate fetching product details
      const fetchedProduct = {
        name: "उपचार पत्थर सेट (Healing Crystal Set)",
        description: "अपनी ऊर्जा को संतुलित करने के लिए उपचार पत्थरों का एक चयनित सेट।",
        price: 2499,
      }
      setProduct(fetchedProduct)
    }
  }, [slug])

  if (!product) return <div>Loading...</div>

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ₹{product.price.toLocaleString('en-IN')}</p>
      {/* Add purchase logic here */}
    </div>
  )
}

export default PurchasePage