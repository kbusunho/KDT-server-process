const express = require("express");
let Character = require("../models/CharacterModel");
const router = express.Router();


// ✅ [POST] 캐릭터 추가
router.post("/", async (req, res) => {
  try {
    const { name, level, isOnline } = req.body;

    if (!name || typeof level !== "number") {
      return res.status(400).json({ message: "name과 level은 필수입니다." });
    }

    const newChar = new Character({
      name,
      level,
      isOnline: isOnline ?? false,
    });

    const savedChar = await newChar.save();

    res.status(200).json({ message: "캐릭터 추가 성공", character: savedChar });
  } catch (error) {
    console.error("캐릭터 추가 오류", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// ✅ [GET] 전체 캐릭터 목록 조회
router.get("/", async (req, res) => {
  try {
    const characters = await Character.find();
    res.status(200).json({ message: "전체 캐릭터 목록", characters });
  } catch (error) {
    console.error("전체 캐릭터 조회 오류", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// ✅ [GET] 특정 캐릭터 조회
router.get("/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ message: "캐릭터를 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "캐릭터 조회 성공", character });
  } catch (error) {
    console.error("캐릭터 조회 오류", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// ✅ [PUT] 특정 캐릭터 수정
router.put("/:id", async (req, res) => {
  try {
    const { name, level, isOnline } = req.body;

    if (!name || typeof level !== "number") {
      return res.status(400).json({ message: "name과 level은 필수입니다." });
    }

    const updatedChar = await Character.findByIdAndUpdate(
      req.params.id,
      { name, level, isOnline },
      { new: true, runValidators: true }
    );

    if (!updatedChar) {
      return res.status(404).json({ message: "캐릭터를 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "캐릭터 수정 성공", character: updatedChar });
  } catch (error) {
    console.error("캐릭터 수정 오류", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// ✅ [DELETE] 특정 캐릭터 삭제
router.delete("/:id", async (req, res) => {
  try {
    const deletedChar = await Character.findByIdAndDelete(req.params.id);

    if (!deletedChar) {
      return res.status(404).json({ message: "캐릭터를 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "캐릭터 삭제 성공", character: deletedChar });
  } catch (error) {
    console.error("캐릭터 삭제 오류", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;


module.exports = router;
