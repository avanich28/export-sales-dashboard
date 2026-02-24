import ContactForm from "./forms/ContactForm";
import CustomerForm from "./forms/CustomerForm";
import DocumentForm from "./forms/DocumentForm";
import PlanForm from "./forms/PlanForm";
import ProductForm from "./forms/ProductForm";
import ContactItem from "./items/ContactItem";
import CustomerItem from "./items/CustomerItem";
import DocumentItem from "./items/DocumentItem";
import PlanItem from "./items/PlanItem";
import ProductItem from "./items/ProductItem";

const shipmentHeader: string[] = [
  "customer",
  "incoterms",
  "port of unload",
  "credit term",
  "CCY",
];

const contactHeader: string[] = [
  // NOTE Add company/ address
  "address",
  // NOTE Add email
  "buyer",
];

const productHeader: string[] = [
  "image",
  "code",
  "description",
  "customer",
  "h.s.code",
  "DXR",
  "price",
  "CCY",
];

// NOTE Add week
const planHeader: string[] = [
  "customer",
  "PO receive",
  "load",
  "transit time",
  "due",
];

const documentHeader: string[] = ["customer", "courier", "email", "driver"];

const freightAndShippingContactHeader: string[] = [
  "customer",
  // NOTE Add freight/ shipping
  "service",
  // NOTE Add booking/ bl/ export entry/ form with type (name, (email, line))
  "contact details",
];

export const informationDefault = {
  customer: {
    header: {
      shipments: shipmentHeader,
      contacts: contactHeader,
    },
    item: (info) => <CustomerItem info={info} />,
    form: (isEdit, info) => <CustomerForm isEdit={isEdit} info={info} />,

    hasTransportationMode: false,
  },
  product: {
    header: productHeader,
    item: (info) => <ProductItem info={info} />,
    form: (customers, isEdit, info) => (
      <ProductForm customers={customers} isEdit={isEdit} info={info} />
    ),
    hasTransportationMode: false,
  },
  plan: {
    header: planHeader,
    item: (info) => <PlanItem info={info} />,
    form: (customers, isEdit, info) => (
      <PlanForm customers={customers} isEdit={isEdit} info={info} />
    ),

    hasTransportationMode: true,
  },
  document: {
    header: documentHeader,
    item: (info) => <DocumentItem info={info} />,
    form: (customers, isEdit, info) => (
      <DocumentForm customers={customers} isEdit={isEdit} info={info} />
    ),
    hasTransportationMode: false,
  },
  contact: {
    header: freightAndShippingContactHeader,
    item: (info) => <ContactItem info={info} />,
    form: (customers, isEdit, info) => (
      <ContactForm customers={customers} isEdit={isEdit} info={info} />
    ),
    hasTransportationMode: true,
  },
};

export const allInformationPages: string[] = Object.keys(informationDefault);

export const customerDetails: string[] = Object.keys(
  informationDefault.customer.header,
);

export const currency: string[] = ["THB", "CNY", "YEN", "EUR", "USD"];

export const incoterms: string[] = ["EXW", "FCA", "DDU", "DDP", "FOB"];

export const transportationModes: string[] = [
  "sea-freight",
  "air-freight",
  "courier",
];

export const documentTypes: string[] = [
  "booking",
  "blOrAwb",
  "exportEntry",
  "form",
];
