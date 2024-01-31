import { Simplify } from 'type-fest';
import { z } from 'zod';

const categoryContentKeyFieldsSchema = z.array(
  z
    .object({
      title: z.string().min(1),
    })
    .passthrough()
    .or(
      z
        .object({
          name: z.string().min(1),
        })
        .passthrough(),
    ),
  // https://github.com/colinhacks/zod/issues/117#issuecomment-1595801389
  { errorMap: () => ({ message: 'Object must have either a non-empty title- or name property' }) },
);

export default categoryContentKeyFieldsSchema;

export type CategoryContentKeyFields = Simplify<z.infer<typeof categoryContentKeyFieldsSchema>>;
