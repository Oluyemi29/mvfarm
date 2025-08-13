import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Container } from "@react-email/container";
import { Section } from "@react-email/section";
import { Button } from "@react-email/button";
import { Tailwind } from "@react-email/tailwind";

interface ForgotPasswordEmailProps {
  resetLink: string;
}

export const ForgotPasswordEmail = ({
  resetLink,
}: ForgotPasswordEmailProps) => {
  return (
    <Html>
      <Tailwind>
        <Section className="bg-[#ffe1bf] text-[#5c4122] p-8 font-sans">
          <Container className="bg-white rounded-xl p-6 shadow-md max-w-md mx-auto">
            <Text className="text-lg font-semibold mb-4">Hi dear user,</Text>
            <Text className="mb-4">
              We received a request to reset your password for your MVFARM
              account. Click the button below to reset it:
            </Text>

            <div className="text-center my-6">
              <Button
                href={resetLink}
                className="bg-[#5c4122] text-white px-6 py-3 rounded-md font-medium inline-block"
              >
                Reset Your Password
              </Button>
            </div>

            <Text className="text-sm mt-4">
              Or copy and paste this link in your browser:
              <br />
              <a
                href={resetLink}
                className="text-[#5c4122] underline break-all"
              >
                {resetLink}
              </a>
            </Text>

            <Text className="mt-6 text-sm text-[#5c4122]/80">
              If you didn`t request a password reset, you can safely ignore this
              email.
            </Text>

            <Text className="text-xs text-[#5c4122]/50 mt-4">
              — The MVFARM Team
            </Text>
          </Container>
        </Section>
      </Tailwind>
    </Html>
  );
};

export default ForgotPasswordEmail;
