import {
  Provide,
  Inject,
  ServerlessTrigger,
  ServerlessTriggerType,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';
import { main } from '../service/index'

@Provide()
export class GraphHTTPService {
  @Inject()
  ctx: Context;

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/',
    method: 'get',
  })
  async handleHTTPEvent(@Query() name = 'midwayjs') {
    return main();
  }
}
