import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Heading } from '@react-email/heading';
import { Container } from '@react-email/container';
import { Tailwind } from '@react-email/tailwind';


export default function SubscriptionSuccessEmail() {
  return (
    <Html>
      <Tailwind>
        <Container className="bg-white rounded-md shadow-md p-6 max-w-md mx-auto">
          <Heading className="text-blue-600 text-lg font-bold mb-4">
            Subscription Confirmed 🎉
          </Heading>

          <Text className="text-base text-gray-800">
            Hello Subscriber,
          </Text>

          <Text className="text-base text-gray-800">
            You have successfully subscribed to our updates. Get ready to receive the latest news, offers, and updates directly in your inbox.
          </Text>

          <Text className="text-sm text-gray-500 mt-6">
            Thank you for choosing MVFARM!
            <br />
            This is an automated message. Please do not reply.
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
}
