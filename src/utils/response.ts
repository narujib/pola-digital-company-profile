import { NextResponse } from "next/server";

// ==========================================
// JSON:API Types
// ==========================================

interface JsonApiResource {
  type: string;
  id: string;
  attributes: Record<string, unknown>;
  relationships?: Record<
    string,
    { data: { type: string; id: string } | { type: string; id: string }[] }
  >;
}

interface JsonApiSingleOptions {
  type: string;
  id: string;
  attributes: Record<string, unknown>;
  relationships?: JsonApiResource["relationships"];
  included?: JsonApiResource[];
  meta?: Record<string, unknown>;
  status?: number;
}

interface JsonApiListOptions {
  type: string;
  items: { id: string; attributes: Record<string, unknown>; relationships?: JsonApiResource["relationships"] }[];
  included?: JsonApiResource[];
  meta?: Record<string, unknown>;
  status?: number;
}

interface JsonApiMetaOnlyOptions {
  meta: Record<string, unknown>;
  status?: number;
}

interface JsonApiErrorOptions {
  code: string;
  detail: string;
  status?: number;
}

// ==========================================
// JSON:API Success Responses
// ==========================================

/**
 * Single resource response
 * { data: { type, id, attributes, relationships? }, included?, meta? }
 */
export function jsonApiSingle({
  type,
  id,
  attributes,
  relationships,
  included,
  meta,
  status = 200,
}: JsonApiSingleOptions) {
  const data: JsonApiResource = { type, id, attributes };
  if (relationships) data.relationships = relationships;

  return NextResponse.json(
    {
      data,
      ...(included?.length && { included }),
      ...(meta && { meta }),
    },
    { status }
  );
}

/**
 * List resource response
 * { data: [{ type, id, attributes, relationships? }], included?, meta? }
 */
export function jsonApiList({
  type,
  items,
  included,
  meta,
  status = 200,
}: JsonApiListOptions) {
  const data: JsonApiResource[] = items.map((item) => {
    const resource: JsonApiResource = { type, id: item.id, attributes: item.attributes };
    if (item.relationships) resource.relationships = item.relationships;
    return resource;
  });

  return NextResponse.json(
    {
      data,
      ...(included?.length && { included }),
      ...(meta && { meta }),
    },
    { status }
  );
}

/**
 * Meta-only response (e.g., delete confirmation)
 * { meta: { message } }
 */
export function jsonApiMeta({ meta, status = 200 }: JsonApiMetaOnlyOptions) {
  return NextResponse.json({ meta }, { status });
}

// ==========================================
// JSON:API Error Response
// ==========================================

/**
 * Error response
 * { errors: [{ status, code, detail }] }
 */
export function jsonApiError({
  code,
  detail,
  status = 400,
}: JsonApiErrorOptions) {
  return NextResponse.json(
    {
      errors: [
        {
          status: String(status),
          code,
          detail,
        },
      ],
    },
    { status }
  );
}
