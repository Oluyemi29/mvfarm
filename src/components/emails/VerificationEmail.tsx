import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Container,
  Text,
  Heading,
  Section,
} from "@react-email/components";

type VerificationEmailProps = {
  code: string;
};

export const VerificationEmail = ({ code }: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your MVFARM verification code</Preview>
      <Tailwind>
        <Body className="bg-[#ffe1bf] font-sans text-[#5c4122]">
          <Container className="bg-white mx-auto my-10 p-8 rounded-lg shadow-lg max-w-lg">
            <Heading className="text-3xl font-bold mb-4 text-center">
              Welcome to MVFARM
            </Heading>
            <Text className="text-lg mb-4">
              Hi <strong>dear</strong>,
            </Text>
            <Text className="mb-4">
              Thank you for signing up with <strong>MVFARM</strong>. To verify
              your account, please use the code below:
            </Text>
            <Section className="text-center my-6">
              <Text className="inline-block bg-[#5c4122] text-white px-6 py-3 rounded-md text-xl tracking-widest font-mono shadow-md">
                {code}
              </Text>
            </Section>
            <Text className="mb-2">
              This code is valid for the next 10 minutes. If you didn`t request
              this, you can safely ignore this email.
            </Text>
            <Text className="mt-6 text-sm text-center">
              &copy; {new Date().getFullYear()} MVFARM. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
