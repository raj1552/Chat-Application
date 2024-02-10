import { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/');
      const respponseData = await response.json()
      setData(respponseData.results)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>My Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
