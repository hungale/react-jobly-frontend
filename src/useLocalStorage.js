import React, { useState } from "react";

const useLocalStorage = () => {
  const [locals, setLocals] = useState(localStorage);
};

export default useLocalStorage;