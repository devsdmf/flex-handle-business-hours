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
    phoneNumber: '+5531993323271',
  },
  {
    name: 'Jane Doe',
    phoneNumber: '+5531999999999',
  }
])

module.exports = {
  getDomain,
  getContacts,
};
