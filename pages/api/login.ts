export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  const validAccountCsv = `admin,admin
    account1,password1
    account2,password2
    account3,password3
    account4,password4
    account5,password5
    `;

  const { account, password } = (await req.json()) as {
    account: string;
    password: string;
  };
  if (!account || !password)
    return new Response(
      JSON.stringify({ error: 'Invalid account or password' }),
      { status: 401 },
    );

  const validAccounts = validAccountCsv.split('\n').map((line) => {
    const [account, password] = line.split(',');
    if (!account || !password) return { account: '', password: '' };
    return { account: account.trim(), password: password.trim() };
  });

  const validAccount = validAccounts.find((validAccount) => {
    return (
      validAccount.account === account && validAccount.password === password
    );
  });

  if (validAccount) {
    return new Response(JSON.stringify({ token: 'valid-token' }), {
      status: 200,
    });
  }

  return new Response(
    JSON.stringify({ error: 'Invalid account or password' }),
    { status: 401 },
  );
};

export default handler;
