"use client";
import React, { useState } from "react";
interface InputTagProps {
  text: string;
  rows?: number;
  cols?: number;
  names?: string;
}

export const InputTag: React.FC<InputTagProps> = ({
  text,
  rows = 4,
  cols = 50,
  names = "",
}) => {
  const [name, setName] = useState(text);

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };
  return (
    <textarea
      cols={cols}
      rows={rows}
      className="rounded-md px-4 py-2 bg-inherit border mb-6 w-fit"
      name={names}
      value={name}
      onChange={handleChange}
      required
    />
  );
};
