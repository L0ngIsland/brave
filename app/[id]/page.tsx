import OperatorMenu from "@/components/operator-menu";

const page = async ({ params }: { params: { id: string } }) => {
  return <OperatorMenu id={params.id} />;
};

export default page;
