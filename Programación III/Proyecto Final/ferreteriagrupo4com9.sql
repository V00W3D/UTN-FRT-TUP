-- Asegurarse de crear la DB y usarla
CREATE DATABASE IF NOT EXISTS ferreteriagrupo4com9;
USE ferreteriagrupo4com9;

-- =========================
-- TABLA: usuarios
-- =========================
CREATE TABLE IF NOT EXISTS usuarios (
  ID_Usuario INT PRIMARY KEY AUTO_INCREMENT,
  disponible BOOLEAN DEFAULT TRUE,
  rol ENUM("admin", "user") DEFAULT "user",
  nombre_user VARCHAR(30) NOT NULL,
  pass VARCHAR(30) NOT NULL,
  telefono_user VARCHAR(15),
  mail_user VARCHAR(50) NOT NULL,
  usuarios_imagen TEXT
);

-- =========================
-- TABLA: categorias
-- =========================
CREATE TABLE IF NOT EXISTS categorias (
  ID_Categoria INT PRIMARY KEY AUTO_INCREMENT,
  nombre_categoria VARCHAR(50) NOT NULL
);

-- =========================
-- TABLA: productos
-- =========================
CREATE TABLE IF NOT EXISTS productos (
  ID_Prod INT PRIMARY KEY AUTO_INCREMENT,
  disponible BOOLEAN DEFAULT TRUE,
  nombre_prod VARCHAR(50) NOT NULL,
  precio DOUBLE NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  productos_imagen TEXT,
  FK_IDCategoria INT NOT NULL,
  FOREIGN KEY (FK_IDCategoria) REFERENCES categorias(ID_Categoria)
);

-- =========================
-- TABLA: empleados
-- =========================
CREATE TABLE IF NOT EXISTS empleados (
  ID_Empleado INT PRIMARY KEY AUTO_INCREMENT,
  estado ENUM("activo", "despedido") DEFAULT "activo",
  nombre_empleado VARCHAR(30) NOT NULL,
  telefono_empleado VARCHAR(15),
  mail_empleado VARCHAR(50) NOT NULL,
  empleados_imagen TEXT
);

-- =========================
-- TABLA: ventas
-- =========================
CREATE TABLE IF NOT EXISTS ventas (
  ID_Venta INT AUTO_INCREMENT PRIMARY KEY,
  numero_orden INT NOT NULL,
  fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,
  FK_IDUsuario INT NOT NULL,
  FK_IDProd INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(15,2) NOT NULL,
  total_producto DECIMAL(15,2) AS (cantidad * precio_unitario) STORED,
  total_orden DECIMAL(15,2),
  estado ENUM('completada', 'anulada') DEFAULT 'completada',
  FOREIGN KEY (FK_IDUsuario) REFERENCES usuarios(ID_Usuario) ON DELETE CASCADE,
  FOREIGN KEY (FK_IDProd) REFERENCES productos(ID_Prod) ON DELETE CASCADE
);
-- ⚠️ Esta tabla ahora elimina ventas si eliminás el usuario o el producto.

-- =========================
-- TABLA: carrito
-- =========================
CREATE TABLE IF NOT EXISTS carrito (
  ID_Carrito INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  FK_IDUsuario INT NOT NULL,
  FK_IDProd INT NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (FK_IDUsuario) REFERENCES usuarios(ID_Usuario),
  FOREIGN KEY (FK_IDProd) REFERENCES productos(ID_Prod)
);

INSERT INTO usuarios (rol, nombre_user, pass, telefono_user, mail_user, usuarios_imagen) VALUES
("admin", "Admin", "admin123", "123456789", "admin@a.com", "https://s1.zerochan.net/Lucoa.600.3692300.jpg"),
("user", "Anonimo", "anonimo123", "789456123", "anonimo@a.com", "https://pbs.twimg.com/profile_images/1462021134539493379/_XpX7TGx_400x400.jpg"),
("user", "Cosme Fulanito", "fulano666", "3816517779", "fulano@hotmail.com", "https://pbs.twimg.com/profile_images/1458226278096531457/L1BCstph_400x400.jpg"),
("user", "Dr. Heinz Doofenshmirtz", "platypus", "55512347", "MalvadosYAsociados@gmail.com", "https://static.wikia.nocookie.net/ce3b5c89-eba1-49e2-98ce-73a3cfff3ee6"),
("user", "Doggie Kruger", "Dekamaster", "0911647134", "Dekamaster@gmail.com", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOHXXHYmfh4G1pJnE3-VTo5ff1D46_XSs-2g&s"),
("user", "Julian Omar", "MIlanesasmp3", "381245567", "JulianM@gmail.com", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4H_ZxrYC1q6Bjv8slKKVxwt8HytDd6mCh3w&s"),
("user", "Dell Conagher", "Redspy", "54567901", "Dispenserhere@gmail.com", "https://i1.sndcdn.com/artworks-000173451332-o2jgyk-t1080x1080.jpg"),
("user", "Nolan Grayson", "Omniass", "555801820", "Omniman@gmail.com", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-tZHVC0o4b-6z-cjBvH0Vc_WDZvXYcmFXw&s"),
("user", "Hideo Kojima", "MetalGearDelta", "555723903120", "Hk@gmail.com", "https://fotos.perfil.com/2022/09/18/trim/900/900/hideo-kojima-20220918-1421881.jpg"),
("user", "Tyler The Creator", "Chromakopia", "451341235", "Tytc@gmail.com", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7kS7HPxOP6IB4DvjgRkVJy6TSrPGTWknFSFWJ6U2M-zomMrd2-LK5g_BWnUSN97L90Vg&usqp=CAU"),
("user", "El Frot", "Lechero5", "12039120", "Masterlechero@gmail.com", "https://static1.personalitydatabase.net/2/pdb-images-prod/e0fad2e6/profile_images/0dbdbb1bbcb14b0d9b7275c4a88420da.png"),
("user", "Ren Amamiya", "Phantomthieve", "9381213028", "Jokerextreme@gmail.com", "https://preview.redd.it/l4s57f3d30t41.jpg?width=640&crop=smart&auto=webp&s=98356328422e4097102af4df1b83ee5017fa5c3c"),
("user", "Willy E Coyote", "Acme1234", "89410234801", "Ecoyote@acme.com", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCJ2YW3g_PjgZC2xFstPbo1f73U7f24oGNA&s"),
("user", "Franky", "Sunny", "1274691876", "Superrr@gmail.com", "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/12/super-flavor.jpeg"),
("user", "Indio Solari", "NoloSoñé", "1294618947", "ISolari@gmail.com", "https://www.rosario3.com/__export/1679861811869/sites/rosario3/img/2023/03/26/indio_solari.jpg_1192065467.jpg"),
("user", "Mason ", "HUhuHAHA", "7461762312", "MasonM@gmail.com", "https://images.hitpaw.com/topics/ai-voice/mason-and-phil-madagascar.jpg"),
("user", "Gru", "Despicable Me", "1241231412", "DespMe@vile.com", "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/12/gru-4-mi-villano-favorito-2024-3253838.jpg?tf=3840x"),
("user", "Isabelle", "Iaaiaoeiaiao", "14298471248", "WauWau@gmail.com", "https://nfccardstore.com/cdn/shop/products/AC_Isabelle_7XU6aGu.17345b1513ac044897cfc243542899dce541e8dc.9afde10b_1200x1200.png?v=1638504662"),
("user", "Crazy Dave", "Dave12023", "1321545342", "Webiwabo@gmail.com", "https://www.capsulecomputers.com.au/wp-content/uploads/crazy-dave-01.jpg"),
("user", "Sonozaki Raito", "Cyclone", "12348032", "Fangjoker@gmail.com", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf6GTVOJDlHo1xNdDDfAwtZBv5oe-79aadaQ&s");

INSERT INTO categorias(nombre_categoria) VALUES
("Ferretería general"),
("Herramientas eléctricas"),
("Pinturas"),
("Fontanería"),
("Construcción");

INSERT INTO productos (nombre_prod, precio, stock, productos_imagen, FK_IDCategoria) VALUES
("Chispa Líquida", 1500, 30, "https://okdiario.com/img/2017/03/23/pahoehoe_toe-655x368.jpg", 1),
("D.P.punta hueca 20mm", 10000, 5, "https://http2.mlstatic.com/D_NQ_NP_611144-MLU72456525599_102023-O.webp", 1),
("Motosierra de mano", 250000, 20, "https://media.cgtrader.com/variants/xzhfH6YDqCH9RoPB3VuUaNdf/a26e47dab5f2d22c43d6c5ce4b4b46ecc30c70918878397cba1a10c1e35d7bfc/1.jpg", 2),
("Anticongelante", 5000, 100, "https://preview.redd.it/they-made-one-piece-antifreeze-v0-7hdq05uqqqre1.jpeg?width=640&crop=smart&auto=webp&s=f866c5e34e59acd54ef4611b418039477d5921a7", 4),
("Cemento Transex", 15000, 5000, "https://globalgtc.cl/wp-content/uploads/2019/06/Cemento.jpg", 5),
("Cable de cobre x Metro", 50000, 10000, "https://jualbelibesitua.com/wp-content/uploads/2020/09/copper-scrap-copper-wire-scrap-millberry-copper-819094.jpg", 1),
("Bateria de Auto", 1000000.02, 1, "https://www.sciencealert.com/images/2018-04/001-demon-core-nuclear-bomb-plutonium-4.jpg", 1),
("Llave para grandes iglesias", 50000, 7, "https://preview.redd.it/this-massive-spanner-at-work-v0-cn3o49yzev6d1.jpeg?auto=webp&s=aaba23645d780e166da48ba33a3f55f2be291528", 4),
("Martillo pequeño (2mts)", 5000000, 1, "https://cdnb.artstation.com/p/assets/images/images/039/143/279/large/juan-sebastian-medina-mjolnir.jpg?1625061079", 5),
("Foco natural", 999999999999, 1, "https://e00-elmundo.uecdn.es/elmundo/imagenes/2012/05/22/ciencia/1337704929_0.jpg", 3),
("Taladro Exorcista 9000", 199999.99, 6, "https://i.redd.it/80x3ynnwu4xd1.png", 2),
("Pintura Negra Absoluta", 79999.99, 25, "https://artbendix.net/wp-content/uploads/2024/11/NEGRO-ABSOLUTO-150ML.jpg", 3),
("Llave Francesa Sentiente", 120000, 3, "https://i.etsystatic.com/9106427/r/il/2632d8/1995681987/il_1080xN.1995681987_d9vs.jpg", 1),
("Cinta Aisladora Dimensional", 15000, 40, "https://flexseal.ca/cdn/shop/products/TFSMAXWHTC04-1000x1000.jpg?v=1714777826", 1),
("Destornillador Cuántico", 320000, 12, "https://imagenes.elpais.com/resizer/v2/FFEZ2KZX6HPXKMYUMRDUQ5Y474.jpg?auth=430233133b5f43d5a9fa32cb9418e12b7546f0edc608dc69dc0f641d6dc2c5b9&width=414", 2),
("Poximix de Neptuno", 8500, 100, "https://acdn-us.mitiendanube.com/stores/002/199/725/products/poximix1-6cbb02799cca8f658516579767730861-1024-1024.jpg", 5),
("Llave Stilson Ancestral", 62000, 8, "https://http2.mlstatic.com/D_912504-MLA84899175126_052025-C.jpg", 4),
("Broca para Realidades Alternas", 450000, 2, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShpsjscVywX4nyIjQ-tnyMDFeSxZ30Tv-uo4S_SARBNCsj1kjU7oQncmOot_S4edDqvtM&usqp=CAU", 2),
("Martillo de la Justicia Divina", 999999, 1, "https://img.freepik.com/fotos-premium/martillo-madera-dorada-3d-rendering-aislado-sobre-fondo-blanco_823159-4163.jpg", 5),
("Teflón de Obsidiana", 13000, 60, "https://obsidianneedles.com/cdn/shop/files/KOTNDALLbk.jpg?v=1682961086", 4);

INSERT INTO empleados (estado, nombre_empleado, telefono_empleado, mail_empleado, empleados_imagen) VALUES
("activo", "Stanley Pines", "09801830", "Estafadorpines@hotmail.com", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBPPOvlVk-aodXnxkOvH9Ov89ZcZB8h4zz5g&s"),
("activo", "BussinessMan", "19203910", "Negocios@outlook", "https://i.ytimg.com/vi/Cidkb2NZTAU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDWRPCrwwvQA2-urCai11yZ_EKEnw"),
("activo", "Sojiro Sakura", "055129392", "Leblanc@hotmail.com", "https://static.wikia.nocookie.net/megamitensei/images/7/78/P5_Sojiro_Sakura_smiling.png"),
("activo", "Kaela Kovalskia", "46718924618", "BonkBonk@gmail.com", "https://pbs.twimg.com/media/FcBbGzdagAI22XJ?format=jpg&name=4096x4096"),
("activo", "Aigis Kirijo", "127461786", "Boommmm@gmail.com", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3T5hUBtqLuqL_imv0l8storrQR83C4WXr6g&s"),
("activo", "Chie Satonaka", "4126478614", "ChieSato@gmail.com", "https://preview.redd.it/chie-satonaka-v0-xg1g5qmx22cd1.jpg?width=531&format=pjpg&auto=webp&s=8f775d77a275704319f2a0f2cf77ce820b4e7ec9"),
("activo", "Fix It Felix", "461278461", "FixIT@gmail.com", "https://64.media.tumblr.com/cd160ab6d6f628f838e5159ede4aef0c/tumblr_nkdw1pLB8o1uoxd7so1_500.jpg"),
("activo", "Harry Hart", "2141241234", "HarryHart@gmail.com", "https://wallpapercave.com/wp/wp12306986.jpg"),
("activo", "Cecil", "58178924712", "Cecilio@gmail.com", "https://i.pinimg.com/736x/f2/f6/9f/f2f69f7107e6c96636d40433a9450060.jpg"),
("activo", "Aqua", "66666666", "AquaGoddess@gmail.com", "https://i.pinimg.com/736x/43/c4/d1/43c4d1d98acf29c32ab7d5b6f7f087d7.jpg"),
("activo", "Kazuma Kiryu", "7419827498", "dragonodojima@gmail.com", "https://i1.sndcdn.com/artworks-000229198238-kujoab-t240x240.jpg"),
("activo", "Zangieff", "182471894", "ZanGieff@gmail.com", "https://i.redd.it/54p36l9pl66c1.png"),
("activo", "Donkey Kong", "81290380", "Bananaslama@gmail.com", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHOlZv7N7lVBykAUfoqV5ydL3KJDVXD5nNZg&s"),
("activo", "Ridley", "0123i01122", "Spacepirate@gmail.com", "https://i1.sndcdn.com/artworks-000445860846-5q7pb8-t500x500.jpg"),
("activo", "Ryugi Bakugami", "13290102", "GozyuTyranno@gmail.com", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrp4Ln47FgyoELHHUl5cF4JqMM5OjciuTPwA&s"),
("activo", "Alex Louis Armstrong", "120390123", "Hierropuro@hotmail.com", "https://i.pinimg.com/736x/94/62/49/94624958ae793c52f029902b18e33149.jpg"),
("activo", "Kazuma", "93012091230", "gokuxsiempre@gmail.com", "https://pm1.aminoapps.com/7150/efb33ad8993380a7ae42a490d79cc6409ecdb232r1-720-853v2_hq.jpg"),
("activo", "Kirito", "139031902", "VRblack@gmail.com", "https://i.pinimg.com/474x/be/af/19/beaf19bddcdb33fde29014ab186c9e61.jpg"),
("activo", "Dardo Fusseneco", "381431232", "Fusseneco@gmail.com", "https://diariohoynet.nyc3.cdn.digitaloceanspaces.com/adjuntos/galerias/000/235/0000235141.jpg"),
("activo", "Kasane Teto", "312091230", "Pearto@gmail.com", "https://i.pinimg.com/564x/b7/39/0d/b7390dadc9886862170d0b130cfd53cb.jpg");

INSERT INTO ventas (numero_orden, FK_IDUsuario, FK_IDProd, cantidad, precio_unitario, total_orden) VALUES
(1, 2, 1, 2, 1500, 47000),
(1, 2, 2, 1, 10000, 47000),
(1, 2, 4, 3, 5000, 47000),
(1, 2, 5, 1, 15000, 47000),
(1, 2, 6, 1, 5000, 47000),
(2, 3, 7, 1, 1000000.02, 1205000.02),
(2, 3, 8, 1, 50000, 1205000.02),
(2, 3, 9, 1, 5000000, 1205000.02),
(2, 3, 10, 1, 999999999999, 1205000.02),
(2, 3, 11, 2, 199999.99, 1205000.02),
(3, 4, 12, 3, 79999.99, 355000),
(3, 4, 13, 1, 120000, 355000),
(3, 4, 14, 2, 15000, 355000),
(3, 4, 15, 1, 320000, 355000),
(3, 4, 16, 5, 8500, 355000),
(4, 5, 17, 1, 62000, 142000),
(4, 5, 18, 1, 450000, 142000),
(4, 5, 19, 1, 999999, 142000),
(4, 5, 20, 2, 13000, 142000),
(4, 5, 3, 1, 25000, 142000),
(5, 6, 1, 1, 1500, 80500),
(5, 6, 2, 2, 10000, 80500),
(5, 6, 3, 1, 25000, 80500),
(5, 6, 4, 2, 5000, 80500),
(5, 6, 5, 1, 15000, 80500),
(6, 7, 6, 5, 50000, 270000),
(6, 7, 7, 1, 1000000.02, 270000),
(6, 7, 8, 1, 50000, 270000),
(6, 7, 9, 1, 5000000, 270000),
(6, 7, 10, 1, 999999999999, 270000),
(7, 8, 11, 1, 199999.99, 430000),
(7, 8, 12, 2, 79999.99, 430000),
(7, 8, 13, 1, 120000, 430000),
(7, 8, 14, 1, 15000, 430000),
(7, 8, 15, 1, 320000, 430000),
(8, 9, 16, 10, 8500, 152500),
(8, 9, 17, 1, 62000, 152500),
(8, 9, 18, 1, 450000, 152500),
(8, 9, 19, 1, 999999, 152500),
(8, 9, 20, 1, 13000, 152500),
(9, 10, 1, 1, 1500, 107000),
(9, 10, 2, 1, 10000, 107000),
(9, 10, 3, 1, 25000, 107000),
(9, 10, 4, 1, 5000, 107000),
(9, 10, 5, 1, 15000, 107000),
(10, 11, 6, 3, 50000, 211000),
(10, 11, 7, 1, 1000000.02, 211000),
(10, 11, 8, 1, 50000, 211000),
(10, 11, 9, 1, 5000000, 211000),
(10, 11, 10, 1, 999999999999, 211000),
(11, 12, 11, 2, 199999.99, 380000),
(11, 12, 12, 3, 79999.99, 380000),
(11, 12, 13, 1, 120000, 380000),
(11, 12, 14, 2, 15000, 380000),
(11, 12, 15, 1, 320000, 380000),
(12, 13, 16, 5, 8500, 110000),
(12, 13, 17, 1, 62000, 110000),
(12, 13, 18, 1, 450000, 110000),
(12, 13, 19, 1, 999999, 110000),
(12, 13, 20, 2, 13000, 110000),
(13, 14, 3, 1, 25000, 133000),
(13, 14, 4, 2, 5000, 133000),
(13, 14, 5, 1, 15000, 133000),
(13, 14, 6, 1, 50000, 133000),
(13, 14, 7, 1, 1000000.02, 133000),
(14, 15, 8, 1, 50000, 151000),
(14, 15, 9, 1, 5000000, 151000),
(14, 15, 10, 1, 999999999999, 151000),
(14, 15, 11, 1, 199999.99, 151000),
(14, 15, 12, 1, 79999.99, 151000),
(15, 16, 13, 1, 120000, 250000),
(15, 16, 14, 1, 15000, 250000),
(15, 16, 15, 1, 320000, 250000),
(15, 16, 16, 2, 8500, 250000),
(15, 16, 17, 1, 62000, 250000),
(16, 17, 18, 1, 450000, 199000),
(16, 17, 19, 1, 999999, 199000),
(16, 17, 20, 1, 13000, 199000),
(16, 17, 1, 2, 1500, 199000),
(16, 17, 2, 1, 10000, 199000),
(17, 18, 3, 1, 25000, 129000),
(17, 18, 4, 1, 5000, 129000),
(17, 18, 5, 1, 15000, 129000),
(17, 18, 6, 1, 50000, 129000),
(17, 18, 7, 1, 1000000.02, 129000),
(18, 19, 8, 1, 50000, 151000),
(18, 19, 9, 1, 5000000, 151000),
(18, 19, 10, 1, 999999999999, 151000),
(18, 19, 11, 1, 199999.99, 151000),
(18, 19, 12, 1, 79999.99, 151000),
(19, 20, 13, 1, 120000, 400000),
(19, 20, 14, 1, 15000, 400000),
(19, 20, 15, 1, 320000, 400000),
(19, 20, 16, 1, 8500, 400000),
(19, 20, 17, 1, 62000, 400000),
(20, 1, 18, 1, 450000, 200000),
(20, 1, 19, 1, 999999, 200000),
(20, 1, 20, 1, 13000, 200000),
(20, 1, 1, 1, 1500, 200000),
(20, 1, 2, 1, 10000, 200000);