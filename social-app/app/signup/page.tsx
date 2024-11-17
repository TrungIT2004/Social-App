'use client'

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { InfoIcon } from "lucide-react"
import Footer from "@/components/footer"

const formSchema = yup.object().shape({
  surname: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  password: yup.string().min(8),
  day: yup.string(),
  month: yup.string(),
  year: yup.string(),
  gender: yup.string(),
})

export default function Component() {
  const router = useRouter()
  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(formSchema),
  })

  // Watch the values for day, month, year, and gender
  const day = watch('day')
  const month = watch('month')
  const year = watch('year')
  const gender = watch('gender')

  // Generate arrays for days, months, and recent years
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const monthsArr = Array.from({ length: 12 }, (_, i) => i + 1)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  const handleSignupMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('http://localhost:3000/v1/users/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const newUser = await res.json()

      console.log(newUser.rows[0])
      return newUser
    }, 
    onSuccess: (data) => {
      router.push('/login')
    }
  })

  const handleSignup = (data: any) => {
    const { year, month, day } = data
  
    // Ensure month and day are two digits
    const formattedMonth = month.padStart(2, '0')
    const formattedDay = day.padStart(2, '0')
    
    // Create the date string
    const birthdate = `${year}-${formattedMonth}-${formattedDay}`
    const username = `${data.surname} ${data.name}`

    const newData = {username, email: data.email, password: data.password, birthdate, gender: data.gender}

    handleSignupMutation.mutate(newData)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow p-4">
        <div className="mx-auto max-w-[432px] pt-[92px]">
          <div className="flex justify-center mb-4">
            <h1 className="text-[#0866ff] text-[40px] font-bold leading-tight">facebook</h1>
          </div>
          <Card className="shadow-lg">
            <CardHeader className="space-y-1 pb-2">
              <CardTitle className="text-[32px] font-bold text-center">Tạo tài khoản mới</CardTitle>
              <CardDescription className="text-center text-base">Nhanh chóng và dễ dàng.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit(handleSignup)}>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Họ" {...register('surname')} />
                  <Input placeholder="Tên" {...register('name')} />
                </div>

                <Input placeholder="Số di động hoặc email" {...register('email')} />
                <Input type="password" placeholder="Mật khẩu mới" {...register('password')} />

                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Label>Ngày sinh</Label>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <Select value={day} onValueChange={(value) => setValue('day', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map(day => (
                          <SelectItem key={day} value={day.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={month} onValueChange={(value) => setValue('month', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {monthsArr.map(month => (
                          <SelectItem key={month} value={month.toString()}>
                            Tháng {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={year} onValueChange={(value) => setValue('year', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Label>Giới tính</Label>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <RadioGroup
                    value={gender}
                    onValueChange={(value) => setValue('gender', value)}
                    className="grid grid-cols-3 gap-3"
                  >
                    <div className="flex items-center justify-between rounded-md border p-2">
                      <Label htmlFor="nữ" className="text-sm">Nữ</Label>
                      <RadioGroupItem value="female" id="nữ" />
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-2">
                      <Label htmlFor="nam" className="text-sm">Nam</Label>
                      <RadioGroupItem value="male" id="nam" />
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-2">
                      <Label htmlFor="tùy-chỉnh" className="text-sm">Tùy chỉnh</Label>
                      <RadioGroupItem value="tùy-chỉnh" id="tùy-chỉnh" />
                    </div>
                  </RadioGroup>
                </div>

                <p className="text-xs text-muted-foreground">
                  Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Facebook.{" "}
                  <Link href="#" className="text-[#0866ff] hover:underline">
                    Tìm hiểu thêm
                  </Link>
                  .
                </p>

                <p className="text-xs text-muted-foreground">
                  Bằng cách nhấp vào Đăng ký, bạn đồng ý với{" "}
                  <Link href="#" className="text-[#0866ff] hover:underline">
                    Điều khoản
                  </Link>
                  ,{" "}
                  <Link href="#" className="text-[#0866ff] hover:underline">
                    Chính sách quyền riêng tư
                  </Link>
                  {" "}và{" "}
                  <Link href="#" className="text-[#0866ff] hover:underline">
                    Chính sách cookie
                  </Link>
                  {" "}của chúng tôi.
                </p>

                <Button className="w-full bg-[#00a400] hover:bg-[#00a400]/90 text-[17px] font-bold h-9">
                  Đăng ký
                </Button>

                <div className="text-center">
                  <Link href="/login" className="text-[#0866ff] hover:underline">
                    Bạn đã có tài khoản ư?
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
