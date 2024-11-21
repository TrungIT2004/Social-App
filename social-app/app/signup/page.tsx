import SignUpForm from "@/components/SignUpForm"
import Footer from "@/components/footer"

export default async function Component() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SignUpForm />
      <Footer />
    </div>
  )
}
