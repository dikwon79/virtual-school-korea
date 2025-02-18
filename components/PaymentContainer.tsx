import { usePaymentWidget } from "@/app/hooks/usePaymentWidget";
import { useEffect, useRef } from "react";

interface PaymentMethodsWidget {
  updateAmount: (amount: number, reason?: string | string[]) => void;
  UPDATE_REASON: {
    COUPON: string;
    POINT: string;
  };
  on: (
    eventName: string,
    callback: (selectedPaymentMethod: string) => unknown
  ) => void;
  getSelectedPaymentMethod: () => {
    type: "NORMAL" | "BRANDPAY" | "KEYIN" | "CUSTOM";
    method?: string;
    easyPay?: {
      provider: string;
    };
    paymentMethodKey?: string;
  };
}

const PaymentContainer = () => {
  const paymentMethodsWidgetRef = useRef<PaymentMethodsWidget | null>(null);
  const { paymentWidget } = usePaymentWidget();
  const { getTotalPrice } = useOrderStore.getState(); // 선택한 메뉴의 총 가격을 가져온다.

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // 결제위젯 렌더링
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    paymentMethodsWidgetRef.current = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: getTotalPrice() },
      { variantKey: "DEFAULT" }
    );

    // 이용약관 렌더링
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    paymentWidget.renderAgreement("#agreement", {
      variantKey: "AGREEMENT",
    });
  }, [paymentWidget]);

  return (
    <div className={styles.container}>
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div id="payment-widget" />
      <div id="agreement" />
      {/*  결제 버튼은 StepButtonContainer.tsx에 */}
    </div>
  );
};
