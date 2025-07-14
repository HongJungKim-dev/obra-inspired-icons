/**
 * 커스텀 아이콘 생성을 위한 스크립트
 * 1. 입력 폴더에서 모든 SVG 파일을 읽어온다.
 * 2. 각 SVG 파일을 처리하여 출력 폴더에 저장한다.
 *
 * 처리 내용
 * 1. width, height 속성 제거
 * 2. stroke와 fill 속성을 currentColor로 변환
 * 3. 출력 폴더에 저장
 */
const fs = require("fs");
const path = require("path");

// 입력 및 출력 폴더 설정
const inputDir = "./raw-icons";
const outputDir = "./customizable-icons";

// 출력 폴더가 없으면 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// SVG 파일 처리 함수
function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // width, height 속성 제거
  let processedContent = content
    .replace(/\s+width="[^"]*"/g, "")
    .replace(/\s+height="[^"]*"/g, "");

  // stroke와 fill 속성을 currentColor로 변환 (none이 아닌 경우만)
  processedContent = processedContent
    .replace(/stroke="(?!none")[^"]*"/g, 'stroke="currentColor"')
    .replace(/fill="(?!none")[^"]*"/g, 'fill="currentColor"');

  return processedContent;
}

// 폴더 내 모든 SVG 파일 처리
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 하위 폴더가 있으면 재귀적으로 처리
      const subOutputDir = path.join(
        outputDir,
        path.relative(inputDir, filePath),
      );
      if (!fs.existsSync(subOutputDir)) {
        fs.mkdirSync(subOutputDir, { recursive: true });
      }
      processDirectory(filePath);
    } else if (path.extname(file) === ".svg") {
      // SVG 파일 처리
      console.log(`Processing: ${file}`);
      const processedContent = processFile(filePath);
      const outputPath = path.join(
        outputDir,
        path.relative(inputDir, filePath),
      );
      fs.writeFileSync(outputPath, processedContent);
      console.log(`✓ Processed: ${file} -> ${path.relative(".", outputPath)}`);
    }
  });
}

// 메인 실행
console.log("🎨 SVG 속성 변환 시작...");
console.log(`📁 입력 폴더: ${inputDir}`);
console.log(`📁 출력 폴더: ${outputDir}`);
console.log("");

try {
  processDirectory(inputDir);
  console.log("");
  console.log("✅ 모든 SVG 파일 처리 완료!");
  console.log("🎉 이제 크기와 색상을 커스텀할 수 있습니다.");
} catch (error) {
  console.error("❌ 오류 발생:", error.message);
  process.exit(1);
}
