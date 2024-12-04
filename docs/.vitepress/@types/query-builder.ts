import { TSchema } from "@sinclair/typebox";
import { Value as V } from "@sinclair/typebox/value";
import { Static, t, TSchema as ElysiaTSchem } from "elysia";
import { Expression, PipelineStage } from "mongoose";

const Value = t.Union([t.String(), t.Number(), t.Boolean(), t.Null()]);

const SortOperator = t.Union([t.Literal("asc"), t.Literal("desc")]);

const LogicalOperation = t.Union([t.Literal("and"), t.Literal("or")]);

const ConditionOperation = t.Union([
  t.Literal(">"),
  t.Literal("<"),
  t.Literal(">="),
  t.Literal("<="),
  t.Literal("="),
  t.Literal("<>"),
]);

const DateDiffUnit = t.Union([
  t.Literal("year"),
  t.Literal("quarter"),
  t.Literal("day"),
  t.Literal("month"),
  t.Literal("hour"),
  t.Literal("minute"),
  t.Literal("second"),
  t.Literal("millisecond"),
]);

const TimeZone = t.Union([t.Literal("+07"), t.String()]);

const ParseOperator = t.Union([t.Literal("abs"), t.Literal("floor")]);

const ExpressionOperation = t.Union([
  t.Literal("+"),
  t.Literal("-"),
  t.Literal("*"),
  t.Literal("/"),
  t.Literal("%"),
]);

const AggFunc = t.Union([
  t.Literal("sum"),
  t.Literal("count"),
  t.Literal("avg"),
  t.Literal("max"),
  t.Literal("min"),
]);

// const IfNull = t.Optional(
//   t.Object({
//     ifNull: Value,
//   })
// );

export const BaseTable = t.Partial(
  t.Object({
    table: t.String(),
    column: t.String(),
    ifNull: t.Optional(Value),
  })
);

const BaseExpressionTerm = t.Recursive((This) =>
  t.Object({
    leftTerm: t.Union([This, BaseTable, Value]),
    rightTerm: t.Union([This, BaseTable, Value]),
    operator: ExpressionOperation, // + - * /
    parseFunc: t.Optional(ParseOperator), // + - * /
  })
);

const ConditionTerm = t.Recursive((This) =>
  t.Object({
    leftTerm: t.Union([This, BaseTable, BaseExpressionTerm, Value]),
    rightTerm: t.Union([This, BaseTable, BaseExpressionTerm, Value]),
    operator: t.Union([ConditionOperation, LogicalOperation]), // > < >= <= = <>
  })
);

const Condition = t.Recursive((This) =>
  t.Object({
    if: ConditionTerm,
    then: t.Union([BaseExpressionTerm, BaseTable, Value]),
    else: t.Union([This, BaseExpressionTerm, BaseTable, Value]),
    aggFunc: t.Optional(AggFunc),
  })
);

const Expression = t.Recursive((This) =>
  t.Object({
    leftTerm: t.Union([This, BaseTable, Condition, BaseExpressionTerm, Value]),
    rightTerm: t.Union([This, BaseTable, Condition, BaseExpressionTerm, Value]),
    operator: ExpressionOperation,
    parseFunc: t.Optional(ParseOperator), // + - * /
  })
);

const BaseSelect = t.Object({
  as: t.Optional(t.String()),
  aggFunc: t.Optional(AggFunc),
  asString: t.Optional(t.Boolean()),
});

const DateValue = t.Union([Value, Expression, Condition]);

const DateDiffObject = t.Object({
  startDate: DateValue,
  endDate: DateValue,
  unit: DateDiffUnit,
  timeZone: TimeZone,
});

const DateDiff = t.Object({
  dateDiff: DateDiffObject,
});

const Var = t.Object({
  name: t.String(),
});

const Val = t.Object({
  val: Value,
});

const Select = t.Intersect([
  t.Union([BaseTable, Expression, Condition, DateDiff, Var, Val]),
  BaseSelect,
]);

const OrderBy = t.Intersect([
  BaseTable,
  t.Object({
    sort: t.Optional(SortOperator),
  }),
]);

const GroupBy = t.Intersect([
  BaseTable,
  t.Object({
    convertFunc: t.Optional(t.String()),
  }),
]);

const Where = ConditionTerm;

const FuncDateTime = t.Object({
  column: t.String(),
  as: t.String(),
  aggFunc: t.Union([
    t.Literal("fulllminute"),
    t.Literal("month"),
    t.Literal("year"),
  ]),
});

const FuncToString = t.Object({
  table: t.String(),
  column: t.String(),
  as: t.String(),
});

const FuncDateDiff = t.Object({
  dateDiff: DateDiffObject,
  as: t.String(),
});

const Join = t.Recursive((This) =>
  t.Object({
    type: t.String(),
    table: t.Optional(t.String()),
    as: t.Optional(t.String()),
    subQuery: t.Optional(
      t.Object({
        addFields: t.Optional(
          t.Array(t.Union([FuncDateTime, FuncDateDiff, FuncToString]))
        ),
        select: t.Array(Select),
        from: t.String(),
        join: t.Optional(t.Array(This)),
        where: t.Optional(t.Array(t.Array(Where))),
        group: t.Optional(t.Array(GroupBy)),
        order: t.Optional(t.Array(OrderBy)),
        // having: t.Optional(t.Array(t.Array(havingConfig))),
      })
    ),
    on: t.Array(t.Array(t.String())),
  })
);

const LoopAndReplaceFunc = t.Object({
  from: t.String(),
  start: t.Number(),
  end: t.Number(),
});

const UnionFunc = t.Object({
  loopReplaceToIndexFunc: t.Optional(LoopAndReplaceFunc),
});

const Query = t.Recursive((This) =>
  t.Object({
    select: t.Array(Select),
    from: t.String(),
    addFields: t.Optional(
      t.Array(t.Union([FuncDateTime, FuncDateDiff, FuncToString]))
    ),
    join: t.Optional(t.Array(Join)),
    where: t.Optional(t.Array(t.Array(Where))),
    group: t.Optional(t.Array(GroupBy)),
    order: t.Optional(t.Array(OrderBy)),
    unionWith: t.Optional(
      t.Array(
        t.Intersect([
          t.Object({
            coll: t.String(),
            query: This,
          }),
          UnionFunc,
        ])
      )
    ),
    //   having: t.Optional(t.Array(t.Array(havingConfig))),
  })
);

const Union = t.Intersect([
  t.Object({
    coll: t.String(),
    query: Query,
  }),
  UnionFunc,
]);

// const Query = t.Object({
//   addFields: t.Optional(t.Array(t.Union([FuncDateTime, FuncDateDiff]))),
//   select: t.Array(Select),
//   from: t.String(),
//   join: t.Array(Join),
//   where: t.Array(t.Array(Where)),
//   group: t.Array(GroupBy),
//   order: t.Array(OrderBy),
//   //   having: t.Optional(t.Array(t.Array(havingConfig))),
// });

type TBaseTable = Static<typeof BaseTable>;
type TValue = Static<typeof Value>;
type TExpression = Static<typeof Expression>;
type TBaseExpressionTerm = Static<typeof BaseExpressionTerm>;
type TDateDiff = Static<typeof DateDiff>;
type TJoin = Static<typeof Join>;
type TBaseSelect = Static<typeof BaseSelect>;
type TSelect = Static<typeof Select>;
type TGroupBy = Static<typeof GroupBy>;
type TCondition = Static<typeof Condition>;
type TConditionTerm = Static<typeof ConditionTerm>;
type TWhere = Static<typeof Where>;
type TOrderBy = Static<typeof OrderBy>;
type TQuery = Static<typeof Query>;
type TProject = PipelineStage.Project["$project"];

type TConditionResult = {
  [k: string]: { [x: string]: TValue } | string[];
};
type TConditionFunc<T> = (c: T) => TConditionResult;
type THasMapString = { [key: string]: string };
type TConditionOperation = Static<typeof ConditionOperation>;
type TExpressionOperation = Static<typeof ExpressionOperation>;
type TDateValue = Static<typeof DateValue>;
type TFuncDateTime = Static<typeof FuncDateTime>;
type TAddField = TFuncDateTime | TFuncDateDiff;
type TFuncDateDiff = Static<typeof FuncDateDiff>;
type TFuncToString = Static<typeof FuncToString>;

type TDateDiffObject = Static<typeof DateDiffObject>;
type TVar = Static<typeof Var>;

type TUnion = Static<typeof Union>;

const Cast = <S extends ElysiaTSchem, T>(
  t: S,
  v: T
): {
  is: boolean;
  val: Static<S>;
} => {
  const check = V.Check(t as unknown as TSchema, v);
  if (check) {
    return {
      is: check,
      val: V.Cast(t as unknown as TSchema, v),
    };
  }
  return {
    is: false,
    val: undefined,
  };
};

type TTerm = TBaseExpressionTerm | TBaseTable | TConditionTerm | TValue;
type TExpressionTerm =
  | TBaseExpressionTerm
  | TBaseSelect
  | TBaseTable
  | TCondition
  | TValue;
type TSide = TBaseExpressionTerm | TBaseTable | TValue;

type AggKey =
  | keyof Expression.Avg
  | keyof Expression.Sum
  | keyof Expression.Count
  | keyof Expression.Max
  | keyof Expression.Min;

type GroupFunc = (g: PipelineStage.Group) => PipelineStage.Group;

export {
  Query,
  TConditionOperation,
  TExpressionOperation,
  TBaseTable,
  TValue,
  TExpression,
  TJoin,
  TSelect,
  TBaseSelect,
  TGroupBy,
  TCondition,
  TWhere,
  TOrderBy,
  TQuery,
  TConditionResult,
  TConditionTerm,
  TConditionFunc,
  THasMapString,
  TProject,
  TBaseExpressionTerm,
  TTerm,
  TExpressionTerm,
  TSide,
  Value,
  Condition,
  AggFunc,
  Expression,
  ConditionTerm,
  BaseExpressionTerm,
  BaseSelect,
  Cast,
  AggKey,
  GroupFunc,
  DateDiff,
  TDateDiff,
  DateValue,
  TDateValue,
  FuncDateTime as FuncFullMinute,
  TFuncDateTime as TFuncFullMinute,
  TAddField,
  TFuncDateDiff,
  FuncDateDiff,
  DateDiffObject,
  TDateDiffObject,
  TVar,
  Var,
  Val,
  Union,
  TUnion,
  FuncToString,
  TFuncToString,
};

export type TZ = {
  name: string;
}