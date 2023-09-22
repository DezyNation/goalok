"use client";
import React from "react";
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Container,
} from "@chakra-ui/react";
import Navbar from "@/components/global/Navbar";
import BlankSpacer from "@/components/global/BlankSpacer";
import Footer from "@/components/global/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <BlankSpacer />
      <Box p={4}>
        <Container maxW={"6xl"}>
          <Heading as="h1" size="lg" mb={4}>
            Privacy Policy
          </Heading>
          <Text>Last updated: [Date]</Text>

          <Heading as="h2" size="md" mt={4} mb={2}>
            Introduction
          </Heading>
          <Text>
            Welcome to the [Your Organization/ISKCON, Inc.] Privacy Policy. We
            respect your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your personal information when you visit our
            website or use our services.
          </Text>

          <Heading as="h2" size="md" mt={4} mb={2}>
            Information We Collect
          </Heading>
          <Text>
            <strong>Personal Information</strong>
          </Text>
          <UnorderedList>
            <ListItem>Name</ListItem>
            <ListItem>
              Contact information (email address, phone number, mailing address)
            </ListItem>
            <ListItem>Payment information (if applicable)</ListItem>
            <ListItem>Any other information you choose to provide</ListItem>
          </UnorderedList>

          <Text>
            <strong>Usage Information</strong>
          </Text>
          <UnorderedList>
            <ListItem>IP address</ListItem>
            <ListItem>Browser type</ListItem>
            <ListItem>Pages viewed</ListItem>
            <ListItem>Date and time of your visit</ListItem>
            <ListItem>Referring website</ListItem>
            <ListItem>Other usage data</ListItem>
          </UnorderedList>

          <Heading as="h2" size="md" mt={4} mb={2}>
            How We Use Your Information
          </Heading>
          <Text>
            We may use the information we collect for various purposes,
            including:
          </Text>
          <UnorderedList>
            <ListItem>To provide and maintain our services</ListItem>
            <ListItem>To process and complete transactions</ListItem>
            <ListItem>
              To send you updates, newsletters, and promotional materials
            </ListItem>
            <ListItem>
              To respond to your inquiries and provide customer support
            </ListItem>
            <ListItem>
              To monitor and analyze usage patterns and trends
            </ListItem>
          </UnorderedList>

          <Heading as="h2" size="md" mt={4} mb={2}>
            Disclosure of Your Information
          </Heading>
          <Text>
            We may disclose your information in the following circumstances:
          </Text>
          <UnorderedList>
            <ListItem>
              With third-party service providers who assist us in providing our
              services
            </ListItem>
            <ListItem>To comply with legal obligations</ListItem>
            <ListItem>To protect our rights and interests</ListItem>
            <ListItem>With your consent</ListItem>
          </UnorderedList>

          <Heading as="h2" size="md" mt={4} mb={2}>
            Security
          </Heading>
          <Text>
            We take reasonable measures to protect your personal information
            from unauthorized access, disclosure, alteration, or destruction.
            However, no method of transmission over the internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </Text>

          <Heading as="h2" size="md" mt={4} mb={2}>
            Your Choices
          </Heading>
          <Text>
            You may have certain rights regarding your personal information,
            including the right to access, correct, or delete it. If you have
            any questions or requests regarding your personal information,
            please contact us using the information provided below.
          </Text>

          <Heading as="h2" size="md" mt={4} mb={2}>
            Changes to This Privacy Policy
          </Heading>
          <Text>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. Any changes will be effective when posted. We
            encourage you to review this Privacy Policy periodically.
          </Text>

          <Heading as="h2" size="md" mt={4} mb={2}>
            Contact Us
          </Heading>
          <Text>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at:
          </Text>
          <Text>support@iskconinc.com</Text>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
