const getDomain = (context) => {
  if (context.DOMAIN_NAME.includes('localhost')) {
    if ('NGROK_DOMAIN' in context) {
      return `https://${context.NGROK_DOMAIN}`;
    }

    return `http://${context.DOMAIN_NAME}`;
  }
  
  return `https://${context.DOMAIN_NAME}`;
};

const getContacts = () => ([
  {
    name: 'John Doe',
    phoneNumber: '+5511999999999',
  },
  {
    name: 'Jane Doe',
    phoneNumber: '+5511999999999',
  }
])

module.exports = {
  getDomain,
  getContacts,
};
