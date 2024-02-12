
import { server } from './server';

import 'dotenv/config';

const PORT: number = parseInt(process.env.PORT || '4000');
server.listen(PORT, (): void => {
  console.log(
    `Server is running on port %c${PORT}`,
    'color: blue; text-decoration: underline;'
  );
  console.log(`http://localhost:${PORT}/api/users/`);
});
