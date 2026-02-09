import { NextResponse } from "next/server";
import { z } from "zod";

// 서버 측 검증 스키마
const contactSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  subject: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  message: z.string().min(10, "메시지는 10자 이상이어야 합니다."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // TODO: 이메일 전송 서비스 연동 (예: Resend, SendGrid, Nodemailer 등)
    console.log("문의 접수:", {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "메시지가 성공적으로 전송되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "입력값이 올바르지 않습니다.", errors: error.issues },
        { status: 400 }
      );
    }

    console.error("문의 처리 실패:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
