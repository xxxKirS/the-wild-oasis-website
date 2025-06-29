import { getCountries } from '@/app/_lib/data-service';
type Props = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
};

type Country = {
  name: string;
  flag: string;
};

type Countries = Country[];

async function SelectCountry({ defaultCountry, name, id, className }: Props) {
  const countries: Countries = await getCountries();

  const flag =
    countries.find((country: Country) => country.name === defaultCountry)
      ?.flag ?? '';

  return (
    <select
      title='Select your country, please.'
      id={id}
      name={name}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
