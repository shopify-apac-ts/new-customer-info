import {
  reactExtension,
  Banner,
  BlockStack,
} from '@shopify/ui-extensions-react/customer-account';

export default reactExtension(
  'customer-account.profile.block.render',
  () => <Extension />,
);

function Extension() {
  return (
    <BlockStack>
      <Banner
        status="success" 
        title="Welcome, new customer! Please fill out your profile to get started."
      />
    </BlockStack>
  );
}
