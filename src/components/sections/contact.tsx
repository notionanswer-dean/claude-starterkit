"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { toast } from "sonner";

// 폼 스키마 정의
const contactFormSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  subject: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  message: z.string().min(10, "메시지는 10자 이상이어야 합니다."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// 연락처 정보
const contactInfo = [
  {
    icon: Mail,
    title: "이메일",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    icon: Phone,
    title: "전화",
    value: "+82 10-1234-5678",
    href: "tel:+821012345678",
  },
  {
    icon: MapPin,
    title: "위치",
    value: "서울특별시, 대한민국",
    href: null,
  },
];

/**
 * Contact 섹션 컴포넌트
 * 연락처 폼과 정보를 표시합니다.
 */
export function ContactSection() {
  const { ref, isInView } = useScrollAnimation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // 폼 제출 핸들러
  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    // 실제 API 호출 시뮬레이션 (실제 구현 시 API 연동 필요)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form data:", data);

    toast.success("메시지가 전송되었습니다!", {
      description: "빠른 시일 내에 답변 드리겠습니다.",
    });

    form.reset();
    setIsSubmitting(false);
  }

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* 섹션 헤더 */}
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              연락하기
            </h2>
            <div className="bg-primary mx-auto mb-4 h-1 w-20 rounded-full" />
            <p className="text-muted-foreground mx-auto max-w-2xl">
              프로젝트 협업이나 문의사항이 있으시면 연락해주세요.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-12 lg:grid-cols-2">
            {/* 연락처 정보 */}
            <motion.div variants={fadeInUp}>
              <Card className="border-border/50 bg-background/50 flex h-full flex-col backdrop-blur-sm">
                <CardContent className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="mb-2 text-2xl font-semibold">연락처 정보</h3>
                    <p className="text-muted-foreground mb-8">
                      아래 연락처로 직접 연락하시거나, 옆 폼을 통해 메시지를
                      보내주세요.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {contactInfo.map((info) => (
                      <div
                        key={info.title}
                        className="hover:bg-muted/50 flex items-center gap-4 rounded-lg p-3 transition-colors"
                      >
                        <div className="bg-primary/10 text-primary rounded-lg p-3">
                          <info.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">
                            {info.title}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="hover:text-primary font-medium transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="font-medium">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 연락처 폼 */}
            <motion.div variants={fadeInUp}>
              <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="mb-2 text-2xl font-semibold">
                      메시지 보내기
                    </h3>
                    <p className="text-muted-foreground">
                      아래 양식을 작성하여 메시지를 보내주세요.
                    </p>
                  </div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>이름</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="홍길동"
                                  {...field}
                                  disabled={isSubmitting}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>이메일</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="example@email.com"
                                  {...field}
                                  disabled={isSubmitting}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>제목</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="문의 제목을 입력해주세요"
                                {...field}
                                disabled={isSubmitting}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>메시지</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="메시지를 입력해주세요"
                                rows={5}
                                {...field}
                                disabled={isSubmitting}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="mr-2"
                          >
                            ⏳
                          </motion.div>
                        ) : (
                          <Send className="mr-2 h-5 w-5" />
                        )}
                        {isSubmitting ? "전송 중..." : "메시지 보내기"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
