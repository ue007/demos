/**
 * @jest-environment jsdom
 */

import { readFile } from "fs/promises";
import path from "path";
import { SqliteSqljs } from "./SqliteSqljs";

const TALKER_DB = path.join(__dirname, "..", "tests", "bags", "2022", "rosbag2_2020_03_13-23_47_56.db3");

async function fileToUint8Array(filePath: string): Promise<Uint8Array> {
  return new Uint8Array(await readFile(filePath));
}

describe("SqliteSqljs", () => {
  beforeAll(async () => {
    await SqliteSqljs.Initialize();
  });

  it("should open a database", async () => {
    const data = await fileToUint8Array(TALKER_DB);
    const db = new SqliteSqljs(data);
    await db.open();
    await db.close();
  });

  it("should read all topics", async () => {
    const data = await fileToUint8Array(TALKER_DB);
    const db = new SqliteSqljs(data);
    await db.open();

    const topics = await db.readTopics();
    expect(topics).toHaveLength(3);
    await db.close();
  });

  it("should retrieve the bag time range", async () => {
    const data = await fileToUint8Array(TALKER_DB);
    const db = new SqliteSqljs(data);
    await db.open();

    const [start, end] = await db.timeRange();
    console.log(start, end);
    await db.close();
  });

  it("should retrieve message counts", async () => {
    const data = await fileToUint8Array(TALKER_DB);
    const db = new SqliteSqljs(data);
    await db.open();

    const counts = await db.messageCounts();
    console.log(counts.size)
    expect(counts.size).toEqual(1);

    await db.close();
  });

  it("should read all messages", async () => {
    const data = await fileToUint8Array(TALKER_DB);
    const db = new SqliteSqljs(data);
    await db.open();

    let count = 0;
    for await (const msg of db.readMessages()) {
      // console.log(msg);
      expect(typeof msg.topic.name).toEqual("string");
      expect(typeof msg.topic.type).toEqual("string");
      // expect(isTimeInRangeInclusive(msg.timestamp, BAG_START, BAG_END)).toEqual(true);
      // expect(msg.data.byteLength).toBeGreaterThanOrEqual(24);
      // expect(msg.data.byteLength).toBeLessThanOrEqual(176);
      ++count;
    }
    expect(count).toEqual(700);

    await db.close();
  });

  it("should read messages filtered by one topic", async () => {
    const data = await fileToUint8Array(TALKER_DB);
    const db = new SqliteSqljs(data);
    await db.open();

    let count = 0;
    for await (const msg of db.readMessages({ topics: ["/r2dpac/drv/sp/gps"] })) {
      expect(msg.topic.name).toEqual("/r2dpac/drv/sp/gps");
      // expect(msg.topic.type).toEqual("std_msgs/msg/String");
      // expect(isTimeInRangeInclusive(msg.timestamp, BAG_START, BAG_END)).toEqual(true);
      // expect(msg.data.byteLength).toEqual(24);
      ++count;
    }
    // console.log(count);
    expect(count).toEqual(700);

    await db.close();
  });

  // it("should read messages filtered by two topics", async () => {
  //   const data = await fileToUint8Array(TALKER_DB);
  //   const db = new SqliteSqljs(data);
  //   await db.open();

  //   let count = 0;
  //   for await (const msg of db.readMessages({ topics: ["/topic", "/rosout"] })) {
  //     expect(typeof msg.topic.name).toEqual("string");
  //     expect(typeof msg.topic.type).toEqual("string");
  //     expect(isTimeInRangeInclusive(msg.timestamp, BAG_START, BAG_END)).toEqual(true);
  //     expect(msg.data.byteLength).toBeGreaterThanOrEqual(24);
  //     expect(msg.data.byteLength).toBeLessThanOrEqual(176);
  //     ++count;
  //   }
  //   expect(count).toEqual(20);

  //   await db.close();
  // });

  // it("should read messages filtered by start and end", async () => {
  //   const data = await fileToUint8Array(TALKER_DB);
  //   const db = new SqliteSqljs(data);
  //   await db.open();

  //   const startTime = addTimes(BAG_START, { sec: 1, nsec: 0 });
  //   const endTime = addTimes(BAG_END, { sec: -2, nsec: 0 });

  //   let count = 0;
  //   for await (const _ of db.readMessages({ startTime })) {
  //     ++count;
  //   }
  //   expect(count).toEqual(16);

  //   count = 0;
  //   for await (const _ of db.readMessages({ endTime })) {
  //     ++count;
  //   }
  //   expect(count).toEqual(12);

  //   await db.close();
  // });

  // it("should read messages with topic and timestamp filters", async () => {
  //   const data = await fileToUint8Array(TALKER_DB);
  //   const db = new SqliteSqljs(data);
  //   await db.open();

  //   const topics = ["/rosout"];
  //   const startTime = addTimes(BAG_START, { sec: 1, nsec: 0 });
  //   const endTime = addTimes(BAG_END, { sec: -2, nsec: 0 });

  //   let count = 0;
  //   for await (const msg of db.readMessages({ topics, startTime, endTime })) {
  //     expect(msg.topic.name).toEqual("/rosout");
  //     expect(msg.topic.type).toEqual("rcl_interfaces/msg/Log");
  //     ++count;
  //   }
  //   expect(count).toEqual(4);

  //   await db.close();
  // });
});
