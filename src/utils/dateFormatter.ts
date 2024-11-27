const dateFormatter = (timestamp: number | string | Date): string =>
    new Date(timestamp).toLocaleString();
  
  export default dateFormatter;
  