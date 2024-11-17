'use client'

import { useState, useRef } from 'react';

export default function FileUpload() {
  const fileInputRef: any = useRef(null);
  const formRef: any = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', fileInputRef.current.files[0]);
    formData.append('username', formRef.current.username.value); // Add other form fields as needed

      console.log(formData);
      
      formData.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});


    // Send the FormData to your server-side endpoint
    // ...
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <input type="text" name="username" />
      <input type="file" ref={fileInputRef} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}