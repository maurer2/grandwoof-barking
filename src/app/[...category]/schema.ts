import { Simplify } from 'type-fest';
import { z } from 'zod';

const categoryPageParamsSchema = z.object({
  category: z
    // .string()
    // .or(z.tuple([z.string(), z.number().optional()]).rest(z.any()))
    .tuple([z.string()])
    .rest(z.string().pipe(z.coerce.number()))
    .transform((categoryValue) => {
      const [categoryName, ...rest] = categoryValue;

      if (rest.length) {
        return [categoryName, rest[0]];
      }

      return [categoryName, 1];
    })
    .pipe(
      z.tuple([
        // prettier-ignore
        z.string().min(1),
        z.number().int().positive().default(1),
      ]),
    ),
});

export default categoryPageParamsSchema;

export type CategoryPageParamsRaw = Simplify<z.input<typeof categoryPageParamsSchema>>;
export type CategoryPageParams = Simplify<z.output<typeof categoryPageParamsSchema>>;
