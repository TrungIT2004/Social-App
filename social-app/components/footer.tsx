import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-auto bg-white py-4 text-[#737373] text-xs">
        <div className="max-w-[980px] mx-auto px-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-2">
            <Link href="#" className="hover:underline">Tiếng Việt</Link>
            <Link href="#" className="hover:underline">English (UK)</Link>
            <Link href="#" className="hover:underline">中文(台灣)</Link>
            <Link href="#" className="hover:underline">한국어</Link>
            <Link href="#" className="hover:underline">日本語</Link>
            <Link href="#" className="hover:underline">Français (France)</Link>
            <Link href="#" className="hover:underline">ภาษาไทย</Link>
            <Link href="#" className="hover:underline">Español</Link>
            <Link href="#" className="hover:underline">Português (Brasil)</Link>
            <Link href="#" className="hover:underline">Deutsch</Link>
            <Link href="#" className="hover:underline">Italiano</Link>
            <button className="border border-gray-300 px-2 hover:bg-gray-100">+</button>
          </div>
          <hr className="my-2 border-gray-300" />
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="#" className="hover:underline">Đăng ký</Link>
            <Link href="#" className="hover:underline">Đăng nhập</Link>
            <Link href="#" className="hover:underline">Messenger</Link>
            <Link href="#" className="hover:underline">Facebook Lite</Link>
            <Link href="#" className="hover:underline">Video</Link>
            <Link href="#" className="hover:underline">Địa điểm</Link>
            <Link href="#" className="hover:underline">Trò chơi</Link>
            <Link href="#" className="hover:underline">Marketplace</Link>
            <Link href="#" className="hover:underline">Meta Pay</Link>
            <Link href="#" className="hover:underline">Cửa hàng trên Meta</Link>
            <Link href="#" className="hover:underline">Meta Quest</Link>
            <Link href="#" className="hover:underline">Instagram</Link>
            <Link href="#" className="hover:underline">Threads</Link>
          </div>
          <div className="mt-4">
            Meta © 2024
          </div>
        </div>
      </footer>
    )
}