import { NextApiRequest, NextApiResponse } from "next";

export default async function toss(req: NextApiRequest, res: NextApiResponse) {
  const { orderId, paymentKey, amount } = req.query;
  const secretKey = process.env.TOSS_SECRET_KEY;

  // 필수 매개변수 확인
  if (!orderId || !paymentKey || !amount) {
    return res.status(400).json({ message: "Missing required parameters." });
  }

  const url = "https://api.tosspayments.com/v1/payments/confirm";
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  try {
    const response = await fetch(url, {
      method: "POST", // HTTP 메서드는 대문자로 지정
      body: JSON.stringify({
        amount: Number(amount), // 문자열을 숫자로 변환
        orderId,
        paymentKey,
      }),
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    //db와 토스랑 같은지 유효성 검사 꼭 해라...
    //-------------------------------todo -----------------------

    // Toss API에서 반환된 에러 응답 처리
    if (!response.ok) {
      console.error("Error from Toss Payments:", result);
      return res.status(response.status).json(result); // 에러 반환
    }

    // 결제 완료 페이지로 리다이렉션
    return res.redirect(`/payments/complete?orderId=${orderId}`);
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
