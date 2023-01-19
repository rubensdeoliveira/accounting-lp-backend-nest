import { ServeStaticModuleOptions } from '@nestjs/serve-static'

import { filesFolder } from '@/application/common/constants'

export const serverStaticConfig: ServeStaticModuleOptions = {
  rootPath: filesFolder,
}
