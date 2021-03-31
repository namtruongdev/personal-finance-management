const CODE = 200;

export default (req, res) => {
  let resolve;
  const { method } = req;
  const message = {};
  try {
    switch (method) {
      case 'POST':
        /* Post method */
        break;

      /* Get */
      default:
        break;
    }
    res.statusCode = CODE;
    res.json({ message });
  } catch (error) {
    // error
  }
  res.status(405).end();
  return resolve;
};
