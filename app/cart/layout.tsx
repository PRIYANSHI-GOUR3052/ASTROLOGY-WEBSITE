export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mt-[40px] lg:mt-[60px]">
      {children}
    </div>
  )
} 