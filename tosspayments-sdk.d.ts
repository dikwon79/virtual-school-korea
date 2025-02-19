declare module "@tosspayments/tosspayments-sdk" {
  export interface TossPayments {
    [x: string]: any;
    requestPayment(options: {
      method: string; // 결제 방법 (e.g., "CARD")
      amount: number; // 금액
      orderId: string; // 주문 ID
      orderName: string; // 주문 이름 또는 제목
      successUrl: string; // 결제 성공 시 리다이렉트 URL
      failUrl: string; // 결제 실패 시 리다이렉트 URL
    }): Promise<void>;
  }

  export function loadTossPayments(clientKey: string): Promise<TossPayments>;
}
