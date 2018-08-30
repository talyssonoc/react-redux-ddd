/* @flow */
type Props = {
  date: Date
};

const FormattedDate = ({ date }: Props) => (
  date.toLocaleString('en-us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
);

export default FormattedDate;
