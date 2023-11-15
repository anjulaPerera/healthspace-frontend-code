import React, {CSSProperties} from 'react'
import Select, {Styles, Theme} from 'react-select'

interface SearchSelectProps {
  options: { value: string, label: string }[]
  value?: string | number;
  onSelectChange: (text: string) => void;
  id: string;
  label: string;
  placeholder?: string;
  loading?: boolean;
}


export const SelectSearchInput: React.FC<SearchSelectProps> = (props) => {
  const customStyles: Styles<{ value: string, label: string }, false> = {
    container: (provided: CSSProperties) => ({
      ...provided,
      width: '100%',
    }),
    control: (provided: CSSProperties) => ({
      ...provided,
      boxShadow: 'none'
    }),
    valueContainer: (provided: CSSProperties) => ({
      ...provided,
    }),
    dropdownIndicator: (provided: CSSProperties) => ({
      ...provided,
    }),
    singleValue: (provided: CSSProperties) => ({
      ...provided,
      // color: '#8898aa',
    }),
    menuPortal: (provided: CSSProperties) => ({...provided, zIndex: 9999})
  };

  const theme = (theme: Theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#4a0cf9',
      primary75: '#805cff',
      primary50: '#ab94ff',
      primary25: '#d5c9ff',
    },
    spacing: {
      ...theme.spacing,
      controlHeight: 48,
    }
  });
  return (
    <div className="htmlForm-group pb-8 w-100" style={{display: "inline-block"}/*{overflow: "auto"}*/}>
      <div style={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
        <label htmlFor={props.id} className="text-black-2 font-size-4 font-weight-semibold  mb-0 w40 pr-6 arrow-3 h-px-48"
               style={{float: "left", lineHeight: "48px" }}>{props.label}</label>
        <div className="htmlForm-group pb-8 w-100"     >
          <Select menuPortalTarget={document.body} options={props.options} styles={customStyles} id={props.id} isLoading={props.loading} theme={theme}
                  value={props.options.find(o => o.value.toString() === props.value?.toString())}
                  onChange={(v) => v && props.onSelectChange(v.value)}/>
        </div>
      </div>
    </div>
  );
};
