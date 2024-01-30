"use client";

import { CardContainer, CardContent } from "@/components/ui/card";
import { Operator } from "@/lib/types";
import { Form } from "./ui/form";
import { List, ListItem } from "./ui/list";
import NavLink from "./ui/link";
import Button from "./ui/button";
import { useAlert, useQuery } from "@/lib/hooks";
import Loading from "./ui/laoding";

export default function OperatorsMenu() {
  const { setAlert } = useAlert();
  const { data, loading, refetch } = useQuery(
    "",
    "GET",
    () => {
      setAlert("Данные получены", "success");
    },
    (res) => {
      setAlert(res.error, "error");
      refetch();
    }
  );
  const {
    data: createdData,
    loading: uploadingCreating,
    refetch: createFetch,
  } = useQuery(
    ``,
    "POST",
    (res) => {
      setAlert(res.data.message, "success");
      refetch();
    },
    (res) => {
      setAlert(`${res.error} ${res.name}`, "error");
    }
  );
  return (
    <>
      <CardContainer>
        {/* <CardTitle>Операторы</CardTitle> */}
        <Form
          // title="Добавить оператора"
          submitTrigger="Добавить"
          values={{
            name: {
              placeholder: "Оператор",
              rules: [
                {
                  pattern: /^[а-яА-Яa-zA-Z0-9]+$/,
                  message:
                    "Только буквы русского и латинского алфавита и цифры",
                },
                {
                  pattern: /.+/,
                  message: "Название не может быть пустым",
                },
              ],
            },
          }}
          onSubmit={(values) => createFetch(values)}
        />
        <CardContent>
          {data && !loading && !uploadingCreating && (
            <List>
              {data.data.map((operator: Operator) => (
                <Operator
                  operator={operator}
                  key={operator.id}
                  refetch={refetch}
                />
              ))}
            </List>
          )}
          {uploadingCreating && !createdData && <Loading />}
          {loading && <Loading />}
        </CardContent>
      </CardContainer>
    </>
  );
}

const Operator = ({
  operator,
  refetch,
}: {
  operator: Operator;
  refetch: () => void;
}) => {
  const { setAlert } = useAlert();

  const { loading: uploadingDeleting, refetch: deleteFetch } = useQuery(
    `${operator.id}`,
    "DELETE",
    (res) => {
      setAlert(res.data.message, "success");
      refetch();
    },
    (res) => {
      setAlert(res.error, "error");
    }
  );

  return (
    <ListItem key={operator.id}>
      <NavLink href={String(operator.id)}>{operator.name}</NavLink>

      {uploadingDeleting ? (
        <span>Удаление...</span>
      ) : (
        <Button onClick={() => deleteFetch()}>Удалить</Button>
      )}
    </ListItem>
  );
};
