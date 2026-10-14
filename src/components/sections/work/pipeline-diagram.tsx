// The sunset migration as a tiny live system: the orchestrator reads affected subscribers from
// OpenSearch/S3 and fans out one SQS message each; the processor migrates them, and every record
// lands as a tracked success or (after retries and the DLQ) a tracked failure. Animated with SVG
// <animateMotion>, so there's no JavaScript; reduced-motion visitors get the static diagram.

import { defined } from "@/lib/utils";

const ROW = 22;
const NODE_H = 22;
const SPLIT_Y = 62;
const OUTCOME_Y = 100;

const nodes = [
  { label: "OpenSearch/S3", x: 0, w: 74 },
  { label: "Orchestrator λ", x: 92, w: 84 },
  { label: "SQS", x: 194, w: 36 },
  { label: "Processor λ", x: 248, w: 70 },
];

const centre = (node: { x: number; w: number }) => node.x + node.w / 2;
const START_X = centre(defined(nodes[0], "first pipeline node"));
const PROCESSOR_X = centre(defined(nodes.at(-1), "processor node"));

const outcomes = {
  success: { label: "✓ migrated", x: 100, w: 92 },
  failure: { label: "✗ failed · tracked", x: 206, w: 112 },
};
const SUCCESS_X = centre(outcomes.success);
const FAILURE_X = centre(outcomes.failure);

const successPath = `M${START_X} ${ROW} H${PROCESSOR_X} V${SPLIT_Y} H${SUCCESS_X} V${OUTCOME_Y}`;
const failurePath = `M${START_X} ${ROW} H${PROCESSOR_X} V${SPLIT_Y} H${FAILURE_X} V${OUTCOME_Y}`;
const DURATION = 4.5;

export function PipelineDiagram() {
  return (
    <svg
      viewBox="0 0 320 134"
      role="img"
      aria-label="Migration pipeline: an orchestrator Lambda reads affected subscribers from OpenSearch and S3 and sends one SQS message per user; a processor Lambda migrates each one, and every record is written to DynamoDB as a tracked success or, after retries and a dead-letter queue, a tracked failure."
      className="w-full overflow-visible font-mono text-[9px]"
    >
      {/* Wiring */}
      <g className="stroke-border" fill="none" strokeWidth={1}>
        {nodes.slice(0, -1).map((node, i) => (
          <path key={i} d={`M${node.x + node.w} ${ROW} H${defined(nodes[i + 1], "next pipeline node").x}`} />
        ))}
        <path d={`M${PROCESSOR_X} ${ROW + NODE_H / 2} V${SPLIT_Y}`} />
        <path d={`M${SUCCESS_X} ${SPLIT_Y} H${PROCESSOR_X}`} />
        <path
          d={`M${SUCCESS_X} ${SPLIT_Y} V${OUTCOME_Y - NODE_H / 2} M${FAILURE_X} ${SPLIT_Y} V${OUTCOME_Y - NODE_H / 2}`}
        />
      </g>
      <text x={FAILURE_X - 6} y={SPLIT_Y + 16} textAnchor="end" className="fill-muted-foreground text-[8px]">
        retries → DLQ
      </text>

      {/* Records in flight, drawn under the nodes so they appear to pass through them */}
      <g className="motion-reduce:hidden">
        {/* Negative begins start each record part-way along, so the flow is already running on first paint. */}
        {[0, 0.9, 1.8, 2.7, 3.6].map((offset) => (
          <circle key={offset} r={2.5} className="fill-brand">
            <animateMotion dur={`${DURATION}s`} begin={`-${offset}s`} repeatCount="indefinite" path={successPath} />
          </circle>
        ))}
        <circle r={2.5} className="fill-amber-500">
          <animateMotion dur={`${DURATION}s`} begin="-2.25s" repeatCount="indefinite" path={failurePath} />
        </circle>
      </g>

      {nodes.map((node, i) => (
        <g key={i}>
          <rect x={node.x} y={ROW - NODE_H / 2} width={node.w} height={NODE_H} className="fill-muted stroke-border" />
          <text x={centre(node)} y={ROW + 3} textAnchor="middle" className="fill-foreground">
            {node.label}
          </text>
        </g>
      ))}

      <g>
        <rect
          x={outcomes.success.x}
          y={OUTCOME_Y - NODE_H / 2}
          width={outcomes.success.w}
          height={NODE_H}
          className="fill-brand/10 stroke-brand/50"
        />
        <text x={SUCCESS_X} y={OUTCOME_Y + 3} textAnchor="middle" className="fill-brand">
          {outcomes.success.label}
        </text>
        <rect
          x={outcomes.failure.x}
          y={OUTCOME_Y - NODE_H / 2}
          width={outcomes.failure.w}
          height={NODE_H}
          className="fill-amber-500/10 stroke-amber-500/60"
        />
        <text x={FAILURE_X} y={OUTCOME_Y + 3} textAnchor="middle" className="fill-amber-700 dark:fill-amber-400">
          {outcomes.failure.label}
        </text>
      </g>

      <text
        x={(outcomes.success.x + outcomes.failure.x + outcomes.failure.w) / 2}
        y={OUTCOME_Y + 28}
        textAnchor="middle"
        className="fill-muted-foreground text-[8px]"
      >
        every record tracked in DynamoDB
      </text>
    </svg>
  );
}
