import { Helmet } from 'react-helmet-async';

export default function PageHead({ title = "Chart - App" }) {
  return (
    <Helmet>
      <title> {title} </title>
    </Helmet>
  );
}
