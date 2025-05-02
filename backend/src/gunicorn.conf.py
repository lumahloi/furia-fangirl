import multiprocessing

bind = "0.0.0.0:10000"

# Número de workers (ajuste conforme seus recursos)
workers = multiprocessing.cpu_count() * 2 + 1

# Timeout aumentado (em segundos)
timeout = 300  # 5 minutos

# Manter conexões vivas
keepalive = 75

# Logs detalhados
accesslog = "-"  # stdout
errorlog = "-"   # stdout