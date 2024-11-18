const fs = require('fs').promises;
const path = require('path');
const regedit = require('regedit').promisified;

function generateConfig(oldConfig, authorblocklistnames) {
	const map = new Map();

	// 获取原先配置
	for (const author of oldConfig.root.general.browser.authorblocklistnames) {
		map.set(author.value, author);
	}

	// 更新配置
	let count = 0;
	for (const author of authorblocklistnames) {
		if (!map.has(author.value)) {
			map.set(author.value, author);
			count++;
		}
	}
	console.log(`添加${count}个屏蔽用户`);

	return {
		...oldConfig,
		root: {
			...oldConfig.root,
			general: {
				...oldConfig.root.general,
				browser: {
					...oldConfig.root.general.browser,
					authorblocklistnames: Array.from(map.values())
				}
			}
		}
	};
}

(async function () {
	// Wallpaper Engine的注册表路径
	const wallpaperRegPath = 'HKCU\\Software\\WallpaperEngine';

	const listResult = await regedit.list([wallpaperRegPath]);

	// 获取壁纸路径 eg: C:\Program Files (x86)\Steam\steamapps\common\wallpaper_engine\wallpaper32.exe
	const wallPaperPath = listResult[wallpaperRegPath]?.values['installPath']?.value;

	// 获取壁纸配置文件路径 eg: C:\Program Files (x86)\Steam\steamapps\common\wallpaper_engine\config.json
	const configPath = wallPaperPath.replace(/wallpaper32\.exe$/, 'config.json');

	// 备份配置文件
	await fs.copyFile(configPath, configPath.replace(/config\.json$/, 'config_backup.json'));

	// 读取配置文件
	const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
	// 读取屏蔽用户列表;
	const arg = process.argv.slice(2)[0];
	let authorblocklistnames = [];
	if (arg) {
		authorblocklistnames = [...JSON.parse(await fs.readFile(path.join(__dirname, 'config', `${arg}.json`), 'utf-8'))];
	} else {
		const configFiles = await fs.readdir(path.join(__dirname, 'config'));
		for await (const file of configFiles) {
			authorblocklistnames = [...authorblocklistnames, ...JSON.parse(await fs.readFile(path.join(__dirname, 'config', file), 'utf-8'))];
		}
	}

	// 生成新配置
	const newConfig = generateConfig(config, authorblocklistnames);

	// 写入新配置
	await fs.writeFile(configPath, JSON.stringify(newConfig, null, 2));
})();
