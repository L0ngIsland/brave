'use client'

import { CardContainer, CardContent, CardTitle } from "./ui/card";
import { Form } from "./ui/form";
import { useRouter } from "next/navigation";
import { useAlert, useQuery } from "@/lib/hooks";
import Loading from "./ui/laoding";

type Props = {
  id: string;
};

const OperatorMenu = ({ id }: Props) => {
  const { push } = useRouter();
  const { setAlert } = useAlert();
  const {
    loading: loadingGetOperator,
    data: operator,
    refetch,
  } = useQuery(
    id,
    "GET",
    (res) => {
      setAlert(`Оператор ${res.data.operator.name}`, "success");
    },
    (res) => {
      setAlert(res.error, "error");
      refetch();
    }
  );
  const { loading: loadingPayment, refetch: paymentFetch } = useQuery(
    id,
    "POST",
    (res) => {
      setAlert(
        `${res.data.message} на номер ${res.data.phone} суммой ${res.data.amount} руб`,
        "success"
      );
      push("/");
    },
    (res) => {
      setAlert(
        `${res.error} на номер ${res.phone} суммой ${res.amount} руб`,
        "error"
      );
    }
  );
  return (
    <CardContainer>
      {/* <CardTitle>{data?.name}</CardTitle> */}
      <CardContent>
        {operator && !loadingGetOperator && (
          <Form
            title={`Оплата оператора ${operator.data.operator.name}`}
            submitTrigger="Оплатить"
            onSubmit={paymentFetch}
            values={{
              phone: {
                type: "tel",
                placeholder: "+7 (999) 999-99-99",
                mask: "+7 (999) 999-99-99",
                rules: [
                  {
                    pattern: /.+/,
                    message: "Введите номер телефона",
                  },
                  {
                    pattern: /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/,
                    message: "Неверный формат",
                  },
                ],
              },
              amount: {
                type: "text",
                max: 1000,
                min: 1,
                placeholder: "1000",
                rules: [
                  {
                    pattern: /^(?:[1-9]\d{0,2}|1000)$/,
                    message: "От 1 до 1000 руб.",
                  },
                ],
              },
            }}
          />
        )}
        {loadingGetOperator && !operator && <Loading />}
        {operator && loadingPayment && <Loading />}
      </CardContent>
    </CardContainer>
  );
};

export default OperatorMenu;
