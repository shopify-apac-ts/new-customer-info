import {useEffect, useState} from 'react';
import {
  reactExtension,
  DateField,
  Link,
  Modal,
  Text,
  Button,
  useApi,
} from '@shopify/ui-extensions-react/customer-account';
import {getCustomerBirthDate, setCustomerBirthDate} from './queries';

export default reactExtension(
  'customer-account.order-index.block.render',
  () => <Extension />,
);

function Extension() {

  const {ui} = useApi();

  const [birthDate, setBirthDate] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [dataRead, setDataRead] = useState(false);
  const [inputBirthDate, setInputBirthDate] = useState("1980-01-01");
  
  useEffect(() => {
    getCustomerBirthDate().then((data) => {
      console.log("query data", data);
      setCustomerId(data.id);
      setBirthDate(data.metafields[0]?.value);
      setDataRead(true);
    });
  }, []);

  if (dataRead === false) {
    return;
  }
  if (!birthDate) {
    return (
      <Link
      overlay={
        <Modal
          id="my-modal"
          padding
          title="Update Profile"
        >
          <DateField 
            value={inputBirthDate}
            onChange= {(value) => {
              setInputBirthDate(value);
              console.log("value", value);
            }}
          />
          <Button
            onPress={() =>{
              setCustomerBirthDate(customerId, inputBirthDate).then((data) => {
                console.log("mutation data", data);
                setBirthDate(inputBirthDate);
              });
              ui.overlay.close('my-modal')
            }
            }
          >
            Update
          </Button>
        </Modal>
      }
      >
        <Text 
          size="extraLarge"
          appearance="critical"
          emphasis="bold"
        >
          Welcome new customer! Click here to update your profile
        </Text>
      </Link>
    );
  }
  return <Text>Welcome back. Your birthday is {birthDate}</Text>;
}
