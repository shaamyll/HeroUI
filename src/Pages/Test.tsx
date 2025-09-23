import CustomDropdown from "../components/Reusable/CustomDropdown";
import  {  useEffect, useState } from "react";


function Test() {
  const [selectedValue, setSelectedValue] = useState("");
  const [items,setItems] = useState<any[]>([])
  const handleChange = (value: string) => {
    console.log("Selected value:", value);
    setSelectedValue(value);
  };

    useEffect(() => {
      fetch(
        `https://fakestoreapi.com/products`
      )
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
        });
    }, []);

  const options = items.map((item)=>({
    value:item.id.toString(),
    label:item.title
  }))

  return (
    <div className="p-4 min-h-screen">
      <h2 className="mb-2 text-lg font-semibold">Test Dropdown</h2>
      <CustomDropdown
        options={options}
        value={selectedValue}
        onChange={handleChange}
        placeholder="Select an option"
        buttonClassName="w-full"
        showSearch={true}
        selectionMode="multiple"
      />
    </div>
  );
}

export default Test;
