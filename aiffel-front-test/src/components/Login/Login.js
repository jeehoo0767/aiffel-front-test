import React, { useState } from 'react';

function Login() {
  const [idValue, setidValue] = useState('');
  const [passwordValue, setpasswordValue] = useState('');

  return (
    <div>
      <input type="text" />
      <input type="password" />
    </div>
  );
}

export default Login;
