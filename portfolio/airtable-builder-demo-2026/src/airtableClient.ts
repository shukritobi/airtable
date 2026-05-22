import { z } from "zod";

const configSchema = z.object({
  AIRTABLE_TOKEN: z.string().min(10),
  AIRTABLE_BASE_ID: z.string().min(5),
  DRY_RUN: z.string().optional().default("true"),
});

export type AirtableCreateRecord<TFields> = {
  fields: TFields;
};

export type AirtableUpdateRecord<TFields> = {
  id: string;
  fields: Partial<TFields>;
};

export class AirtableClient {
  private readonly token: string;
  private readonly baseId: string;
  private readonly apiRoot = "https://api.airtable.com/v0";
  public readonly dryRun: boolean;

  constructor(env = process.env) {
    const config = configSchema.parse(env);
    this.token = config.AIRTABLE_TOKEN;
    this.baseId = config.AIRTABLE_BASE_ID;
    this.dryRun = config.DRY_RUN !== "false";
  }

  async listRecords<TFields>(tableName: string, maxRecords = 100) {
    const url = new URL(`${this.apiRoot}/${this.baseId}/${encodeURIComponent(tableName)}`);
    url.searchParams.set("maxRecords", String(maxRecords));

    const response = await fetch(url, {
      headers: this.headers(),
    });

    if (!response.ok) {
      throw new Error(`Airtable list failed for ${tableName}: ${response.status} ${await response.text()}`);
    }

    return (await response.json()) as { records: Array<{ id: string; createdTime?: string; fields: TFields }> };
  }

  async createRecords<TFields>(tableName: string, records: AirtableCreateRecord<TFields>[]) {
    if (this.dryRun) {
      console.log(`[dry-run] create ${records.length} records in ${tableName}`);
      console.dir(records, { depth: null });
      return { records: [] };
    }

    const response = await fetch(`${this.apiRoot}/${this.baseId}/${encodeURIComponent(tableName)}`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({ records }),
    });

    if (!response.ok) {
      throw new Error(`Airtable create failed for ${tableName}: ${response.status} ${await response.text()}`);
    }

    return response.json();
  }

  async updateRecords<TFields>(tableName: string, records: AirtableUpdateRecord<TFields>[]) {
    if (this.dryRun) {
      console.log(`[dry-run] update ${records.length} records in ${tableName}`);
      console.dir(records, { depth: null });
      return { records: [] };
    }

    const response = await fetch(`${this.apiRoot}/${this.baseId}/${encodeURIComponent(tableName)}`, {
      method: "PATCH",
      headers: this.headers(),
      body: JSON.stringify({ records }),
    });

    if (!response.ok) {
      throw new Error(`Airtable update failed for ${tableName}: ${response.status} ${await response.text()}`);
    }

    return response.json();
  }

  private headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }
}
