const CUSTOMER_API_URL = "shopify:customer-account/api/2025-01/graphql.json";

export async function getCustomerBirthDate() {
  const response = await fetch(
    CUSTOMER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          customer {
            id
            metafields(identifiers: [
              {namespace: "facts", key: "birth_date"},
            ]) {
              id
              key
              value
            }
          }
        }`
      })
    }
  );
  const data = await response.json();
  return data.data.customer;
}

export async function setCustomerBirthDate(id, birthDate) {
  const response = await fetch(
    CUSTOMER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
          metafieldsSet(metafields: $metafields) {
            metafields
            {
              id
              key
              value
            }
          }
        }`,
        variables: {
          metafields: [
            { ownerId: `${id}`, namespace: "facts", key: "birth_date", value: `${birthDate}` }
          ]
        }
      })
    }
  );
  const data = await response.json();
  return data;
}

