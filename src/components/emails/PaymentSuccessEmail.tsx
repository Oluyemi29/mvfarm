import {
  Html,
  Text,
  Heading,
  Container,
  Tailwind,
} from "@react-email/components";

type Props = {
  name: string;
  total: number;
};

export default function PaymentSuccessEmail({ name, total }: Props) {
  return (
    <Html>
      <Tailwind>
        <Container className="bg-white rounded-md shadow-md p-6 max-w-md mx-auto">
          <Heading className="text-green-600 text-lg font-bold mb-4">
            Payment Successful 🎉
          </Heading>

          <Text className="text-base text-gray-800">
            Hello <strong>{name}</strong>,
          </Text>

          <Text className="text-base text-gray-800">
            We`ve received your payment of{" "}
            <strong>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(Number(total))}
            </strong>
            .
          </Text>

          <Text className="text-sm text-gray-500 mt-6">
            Thank you for your trust in MVFARM!
            <br />
            This is an automated message. Please do not reply.
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
}
